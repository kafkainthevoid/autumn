export const APP_STAGE = process.env.NODE_ENV

const HTTP_PROTOCOL = APP_STAGE === "development" ? "http" : "https"
const APP_DOMAIN = APP_STAGE === "development" ? "localhost" : process.env.APP_DOMAIN
const PROVINCE_DOMAIN = process.env.PROVINCE_DOMAIN

// const hostname = window.location.hostname

let APP_URL = `${HTTP_PROTOCOL}://${APP_DOMAIN}:3010`

// if (hostname !== "localhost") {
//   APP_URL = `https://vaguely-exciting-grouse.ngrok-free.app`
// }

export { APP_URL }
export const PROVINCE_URL = `${HTTP_PROTOCOL}://${PROVINCE_DOMAIN}:8000`
