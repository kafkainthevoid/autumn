import qs from "qs"
import crypto from "crypto"

export const sortObject = (obj: any) => {
  let sorted = {}
  let str = []
  let key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key))
    }
  }
  str.sort()
  for (key = 0; key < str.length; key++) {
    // @ts-ignore
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+")
  }
  return sorted
}

export const createSecureHash = (vnp_Params: any) => {
  const signData = qs.stringify(vnp_Params, { encode: false })
  const hmac = crypto.createHmac("sha512", process.env.VNPAY_HASH_SECRET as string)
  const vnp_SecureHash = hmac.update(new Buffer(signData, "utf-8")).digest("hex")

  return vnp_SecureHash
}
