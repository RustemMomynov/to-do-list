import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "246f00ac-5a53-47d5-8ddd-916bd4784048",
  },
})
