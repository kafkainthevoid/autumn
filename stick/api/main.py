from collections import deque
from dataclasses import asdict
import os
from typing import Any, Dict, FrozenSet, List, Optional
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from lunr.exceptions import QueryParseError
from vietnam_provinces import NESTED_DIVISIONS_JSON_PATH
from vietnam_provinces.enums.districts import DistrictEnum, ProvinceEnum
from operator import attrgetter
from pydantic_settings import BaseSettings


from vietnam_provinces.enums.wards import WardEnum

from api.search import Searcher
from .schema import Ward as WardResponse, District as DistrictResponse, ProvinceResponse, SearchResult
from logbook import Logger
from itertools import groupby


class Settings(BaseSettings):
    tracking: bool = False
    cdn_cache_interval: int = 30


api = FastAPI()
repo = Searcher()
logger = Logger(__name__)
settings = Settings()

api.add_middleware(
    CORSMiddleware, allow_origins=["*"]
)

SearchResults = List[SearchResult]
SearchQuery = Query(
    ...,
    title='Query string for search',
    example='Hiền Hòa',
    description='Follow [lunr](https://lunr.readthedocs.io/en/latest/usage.html#using-query-strings)' ' syntax.',
)

@api.get("/api", response_model=List[ProvinceResponse])
async def show_all_divisions(
    request: Request,
    depth: int = Query(
        1,
        ge=1,
        le=3,
        title="Show down to subdivisions",
        description="2: show districts; 3: show wards",
    ),
):
    logger.info("Hi there")
    if not request.client:
        return "request.client is None"
    client_ip = request.client.host

    if depth > 1:
        env_value = os.getenv("BLACKLISTED_CLIENTS", "")
        blacklist = filter(None, (s.strip() for s in env_value.split(",")))
        if client_ip in blacklist:
            logger.info("{} is blacklisted.", client_ip)
            raise HTTPException(429)
    if depth >= 3:
        return FileResponse(NESTED_DIVISIONS_JSON_PATH)
    if depth == 2:
        provinces = deque()
        for k, group in groupby(DistrictEnum, key=attrgetter("value.province_code")):
            p = asdict(ProvinceEnum[f"P_{k}"].value)
            p["districts"] = tuple(asdict(d.value) for d in group)
            provinces.append(p)
        return provinces
    return tuple(asdict(p.value) for p in ProvinceEnum)


@api.get('/api/p/', response_model=List[ProvinceResponse])
async def list_provinces():
    return tuple(asdict(p.value) for p in ProvinceEnum)


@api.get('/api/p/search', response_model=SearchResults)
async def search_provinces(q: str):
    try:
        return repo.search_province(q)
    except QueryParseError:
        raise HTTPException(status_code=422, detail='unrecognized-search-query')


@api.get('/api/p/{code}', response_model=ProvinceResponse)
async def get_province(
    code: int,
    depth: int = Query(
        1, ge=1, le=3, title="Show down to subdivisions", description="2: show districts; 3: show wards"
    ),
):
    try:
        province = ProvinceEnum[f'P_{code}'].value
    except (KeyError, AttributeError):
        raise HTTPException(status_code=400, detail='invalid-province-code')
    response = asdict(province)
    districts = {}
    if depth >= 2:
        districts: Dict[int, Dict[str, Any]] = {
            d.value.code: asdict(d.value) for d in DistrictEnum if d.value.province_code == code
        }
        if depth == 3:
            district_codes: FrozenSet[int] = frozenset(districts.keys())
            for k, group in groupby(WardEnum, key=attrgetter("value.district_code")):
                if k not in district_codes:
                    continue
                districts[k]['wards'] = tuple(asdict(w.value) for w in group)
        response['districts'] = tuple(districts.values())
    return response


@api.get('/api/d/', response_model=List[DistrictResponse])
async def list_districts():
    return tuple(asdict(d.value) for d in DistrictEnum)


@api.get('/api/d/search', response_model=SearchResults)
async def search_districts(q: str = SearchQuery, p: Optional[int] = Query(None, title='Province code to filter')):
    try:
        return repo.search_district(q, p)
    except QueryParseError:
        raise HTTPException(status_code=422, detail='unrecognized-search-query')


@api.get('/api/d/{code}', response_model=DistrictResponse)
async def get_district(
    code: int, depth: int = Query(1, ge=1, le=2, title='Show down to subdivisions', description='2: show wards')
):
    try:
        district = DistrictEnum[f'D_{code}'].value
    except (KeyError, AttributeError):
        raise HTTPException(404, detail='invalid-district-code')
    response = asdict(district)
    if depth == 2:
        response['wards'] = tuple(asdict(w.value) for w in WardEnum if w.value.district_code == code)
    return response


@api.get('/api/w/', response_model=List[WardResponse])
async def list_wards():
    return tuple(asdict(w.value) for w in WardEnum)


@api.get('/api/w/search', response_model=SearchResults)
async def search_wards(
    q: str = SearchQuery,
    d: Optional[int] = Query(None, title='District code to filter'),
    p: Optional[int] = Query(None, title='Province code to filter, ignored if district is given'),
):
    try:
        return repo.search_ward(q, d, p)
    except QueryParseError:
        raise HTTPException(status_code=422, detail='unrecognized-search-query')


@api.get('/api/w/{code}', response_model=WardResponse)
async def get_ward(code: int):
    try:
        ward = WardEnum[f'W_{code}'].value
    except (KeyError, AttributeError):
        raise HTTPException(404, detail='invalid-ward-code')
    return ward


@api.middleware('http')
async def guide_cdn_cache(request: Request, call_next):
    response = await call_next(request)
    response.headers['Cache-Control'] = f's-maxage={settings.cdn_cache_interval}, stale-while-revalidate'
    return response


repo.build_index()
