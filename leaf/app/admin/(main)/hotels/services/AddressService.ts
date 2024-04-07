import axios from "axios"

// const PROVINCE_API_URL = 'https://provinces.open-api.vn/api'
const PROVINCE_API_URL = "http://autumn-province:8000/api"

const getProvinces = async () => {
  const res = await axios.get(PROVINCE_API_URL + "/p/")
  return res.data
}

const getDistricts = async (provinceCode: number) => {
  const res = await axios.get(PROVINCE_API_URL + `/p/${provinceCode}?depth=2`)
  return res.data.districts
}

const getWards = async (districtCode: number) => {
  const res = await axios.get(PROVINCE_API_URL + `/d/${districtCode}?depth=2`)
  return res.data.wards
}

export { getDistricts, getProvinces, getWards }
