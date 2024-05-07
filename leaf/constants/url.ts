export const APP_STAGE = process.env.NODE_ENV

const HTTP_PROTOCOL = APP_STAGE === "development" ? "http" : "https"
const APP_DOMAIN = APP_STAGE === "development" ? "localhost" : process.env.APP_DOMAIN
const PROVINCE_DOMAIN = process.env.PROVINCE_DOMAIN

export const APP_URL = `${HTTP_PROTOCOL}://${APP_DOMAIN}:3010`
export const PROVINCE_URL = `${HTTP_PROTOCOL}://${PROVINCE_DOMAIN}:8000`
