import axios from 'axios'

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API || ''
export const axiosInstance = axios.create({
    baseURL: baseUrl
})