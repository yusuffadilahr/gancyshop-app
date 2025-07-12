import axios from 'axios'

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API || ''
export const axiosInstance = axios.create({
    baseURL: baseUrl
})

axiosInstance.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined'
        ? localStorage.getItem('_token') : null

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
})