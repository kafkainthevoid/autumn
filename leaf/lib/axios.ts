import { APP_URL } from "@/constants/url"
import axios from "axios"

export default axios.create({
  baseURL: APP_URL,
})
