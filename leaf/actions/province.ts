"use server"

import { PROVINCE_URL } from "@/constants/url"

export const getProvinces = async () => {
  const data = await fetch(`${PROVINCE_URL}/api/p/`)
  if (data.ok) return await data.json()
  return []
}
