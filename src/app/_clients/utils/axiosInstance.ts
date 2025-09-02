import Cookies from 'js-cookie'
import axios from 'axios'

export const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API || ''
export const axiosInstance = axios.create({
    baseURL: baseUrlApi,
    withCredentials: true
})

// interceptor sisipin token ke header
axiosInstance.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined'
        ? Cookies.get('_token') : null

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
})

// interceptor handling error 401 unauthorized refresh token
axiosInstance.interceptors.response.use(response => response,
    async (error) => {
        const originalRequest = error.config
        if (error?.response?.data?.statusCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const res = await axios.get(baseUrlApi + '/auth/refresh', {
                    withCredentials: true
                })

                const newToken = res.data?.data?.accessToken;
                if (!newToken) throw new Error('Gagal refresh token!')

                Cookies.set("_token", newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);

            } catch (error) {
                const res = await axios.get(baseUrlApi + '/auth/logout', {
                    withCredentials: true
                })

                if (res?.data?.data?.statusCode === 200) {
                    window.location.href = '/auth/login'
                } else {
                    window.location.href = '/'
                }

                console.log(error);
            }
        }

        return Promise.reject(error);
    }
)