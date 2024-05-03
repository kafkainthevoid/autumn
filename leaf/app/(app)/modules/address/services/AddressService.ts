export const searchProvinces = async (provinceName: string) => {
  const res = await fetch(`/api/provinces/p/search/?q=${provinceName}`)

  if (!res.ok) return []
  const data = await res.json()

  return data
}

const getProvinces = async () => {
  const res = await fetch("/api/provinces/p/")
  if (!res.ok) return []
  const data = await res.json()
  return data
}

const getProvince = async (provinceCode: string | number) => {
  const res = await fetch("/api/province/p/" + provinceCode)

  if (!res.ok) return []
  const data = await res.json()
  return data
}

const getDistricts = async (provinceCode: number | string) => {
  const res = await fetch(`/api/provinces/p/${provinceCode}?depth=2`)

  if (!res.ok) return []

  const data = await res.json()

  return data.districts
}

const getDistrict = async (districtCode: string | number) => {
  const res = await fetch("/api/province/d/" + districtCode)

  if (!res.ok) return []
  const data = await res.json()
  return data
}

const getWards = async (districtCode: number | string) => {
  const res = await fetch(`/api/provinces/d/${districtCode}?depth=2`)
  if (!res.ok) return []
  const data = await res.json()
  return data.wards
}

const getWard = async (wardCode: string | number) => {
  const res = await fetch("/api/province/w/" + wardCode)

  if (!res.ok) return []
  const data = await res.json()

  return data
}

export { getDistricts, getProvinces, getWards, getProvince, getDistrict, getWard }
