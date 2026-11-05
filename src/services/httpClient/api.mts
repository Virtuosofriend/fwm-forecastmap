import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { configuration } from "@/config";

const HEADERS: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

let onUnauthorized: (() => void) | null = null;
export const setUnauthorizedHandler = (handler: () => void) => {
    onUnauthorized = handler;
};

const errorInterceptor = (error: AxiosError): Promise<AxiosError> => {
    console.log("error", error.config);
    // check if it's a server error
    if (!error.response) {
        console.error(error.message);
        return Promise.reject(error);
    }

    // all the error responses
    switch (error.response.status) {
        case 401:
            console.error(error.message);
            onUnauthorized?.();
            break;
        default:
            // Handle other status codes if needed
            break;
    }
    return Promise.reject(error);
};

const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response;
};

const apiMethods = (axiosInstance: AxiosInstance) => {
    return {
        get: <T = unknown,>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
            axiosInstance.get<T>(url, config),
        post: <T = unknown,>(
            url: string,
            body: unknown,
            config?: AxiosRequestConfig,
        ): Promise<AxiosResponse<T>> => axiosInstance.post<T>(url, body, config),
        patch: <T = unknown,>(
            url: string,
            body: unknown,
            config?: AxiosRequestConfig,
        ): Promise<AxiosResponse<T>> => axiosInstance.patch<T>(url, body, config),
        delete: <T = unknown,>(
            url: string,
            config?: AxiosRequestConfig,
        ): Promise<AxiosResponse<T>> => axiosInstance.delete<T>(url, config),
    };
};

const createApiClient = (
    config: AxiosRequestConfig,
    { useInterceptors = false }: { useInterceptors?: boolean } = {},
) => {
    const instance = axios.create(config);
    if (useInterceptors) {
        instance.interceptors.response.use(responseInterceptor, errorInterceptor);
    }
    return { instance, methods: apiMethods(instance) };
};

const directusClient = createApiClient(
    { baseURL: configuration.baseURL, headers: HEADERS, withCredentials: true },
    { useInterceptors: true },
);

const publicClient = createApiClient({ baseURL: configuration.baseURL });

export const api = directusClient.methods;
export const apiObject = directusClient.instance;
export const publicApi = publicClient.methods;
