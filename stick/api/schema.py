from enum import Enum
from typing import Dict, List, Tuple
from pydantic import BaseModel, ConfigDict, Field


from vietnam_provinces.base import VietNamDivisionType


class DivisionLevel(str, Enum):
    P = "province"
    D = "district"
    W = "ward"


_EXAMPLE_WARD = {
    "name": "Phường Phúc Xá",
    "code": 1,
    "division_type": "phường",
    "codename": "phuong_phuc_xa",
    "district_code": 1,
}


class Ward(BaseModel):
    name: str
    code: int
    division_type: VietNamDivisionType
    codename: str
    district_code: int

    model_config = ConfigDict(json_schema_extra={"example": _EXAMPLE_WARD})


_EXAMPLE_DISTRICT = {
    "name": "Quận Ba Đình",
    "code": 1,
    "division_type": "quận",
    "codename": "quan_ba_dinh",
    "province_code": 1,
    "wards": [_EXAMPLE_WARD],
}


class District(BaseModel):
    name: str
    code: int
    division_type: VietNamDivisionType
    codename: str
    province_code: int
    wards: List[Ward] = Field(default=[])

    model_config = ConfigDict(json_schema_extra={"example": _EXAMPLE_DISTRICT})


_EXAMPLE_PROVINCE = {
    "name": "Thành phố Hà Nội",
    "code": 1,
    "division_type": "thành phố trung ương",
    "codename": "thanh_pho_ha_noi",
    "phone_code": 24,
    "districts": [_EXAMPLE_DISTRICT],
}


class ProvinceResponse(BaseModel):
    name: str
    code: int
    division_type: VietNamDivisionType
    codename: str
    phone_code: int
    districts: List[District] = Field(default=[])

    class Config:
        schema_extra = {
            'example': _EXAMPLE_PROVINCE
        }

    # model_config = ConfigDict(json_schema_extra={"example": _EXAMPLE_PROVINCE})


_EXAMPLE_SEARCH = {
    "name": "Thị xã Phú Mỹ",
    "code": 754,
    "matches": {"mỹ": [11, 13]},
}


class SearchResult(BaseModel):
    name: str
    code: int

    matches: Dict[str, Tuple[int, int]] = Field(
        {},
        title="Matched words and their positions in name.",
        description="This info can help client side highlight the result in display",
    )

    model_config = ConfigDict(json_schema_extra={"example": _EXAMPLE_SEARCH})
