import { useAuthStore } from "@/stores/auth";
import axios from "axios";

export const baseUrl = "http://127.0.0.0:5000"
export const apiBaseUrl = baseUrl + "/api"

export const http = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
})

http.interceptors.request.use((config) => {
    const authStore = useAuthStore()

    if (authStore.isLoggedIn && config.headers) {
        config.headers.Authentication = `Bearer ${authStore.accessToken}`
    }
    
    return config
})

export interface MockNetworkResult<T> {
    statusCode: number
    data: T
}
