"use server"

import { PROVINCE_URL } from "@/constants/url"

export const getProvinces = async () => {
  console.log("\n\n\nPROVINCE_URLPROVINCE_URL", PROVINCE_URL)
  const data = await fetch(`${PROVINCE_URL}/api/p/`)
  if (data.ok) return await data.json()
  return []
}
