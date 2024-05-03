import axios from 'axios'

import { AddressVnVm } from '@/modules/address/models/AddressVnVm'
import { PROVINCE_API_URL } from '@/shared/constants/api-url'

export const searchProvinces = async (
  provinceName: string
): Promise<AddressVnVm[]> => {
  const res = await axios.get(
    PROVINCE_API_URL + '/api/p/search/?q=' + provinceName
  )

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}

export const getProvinces = async (): Promise<AddressVnVm[]> => {
  const res = await axios.get(PROVINCE_API_URL + '/api/p/')

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}

export const getProvince = async (
  provinceCode: number
): Promise<AddressVnVm> => {
  const res = await axios.get(PROVINCE_API_URL + '/api/p/' + provinceCode)

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}

export const getDistricts = async (
  provinceCode: number
): Promise<AddressVnVm[]> => {
  const res = await axios.get(
    PROVINCE_API_URL + `/api/p/${provinceCode}?depth=2`
  )

  if (res.status >= 200 && res.status < 300) return res.data.districts

  return Promise.reject(res)
}

export const getDistrict = async (
  districtCode: number
): Promise<AddressVnVm> => {
  const res = await axios.get(PROVINCE_API_URL + '/api/d/' + districtCode)

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}

export const getWards = async (
  districtCode: number
): Promise<AddressVnVm[]> => {
  const res = await axios.get(
    PROVINCE_API_URL + `/api/d/${districtCode}?depth=2`
  )
  if (res.status >= 200 && res.status < 300) return res.data.wards

  return Promise.reject(res)
}

export const getWard = async (wardCode: number): Promise<AddressVnVm> => {
  const res = await axios.get(PROVINCE_API_URL + '/api/w/' + wardCode)

  if (res.status >= 200 && res.status < 300) return res.data

  return Promise.reject(res)
}
