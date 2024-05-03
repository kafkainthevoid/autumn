const getProvinces = async () => {
  const res = await fetch("/api/provinces/p/")
  if (!res.ok) return []
  const data = await res.json()
  return data
}

const getDistricts = async (provinceCode: number) => {
  const res = await fetch(`/api/provinces/p/${provinceCode}?depth=2`)

  if (!res.ok) return []

  const data = await res.json()

  return data.districts
}

const getWards = async (districtCode: number) => {
  const res = await fetch(`/api/provinces/d/${districtCode}?depth=2`)
  if (!res.ok) return []
  const data = await res.json()
  return data.wards
}

export { getDistricts, getProvinces, getWards }
