import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from "axios";

// ***
// * General configuration for Axios instance
// ***

const AUTH_TOKEN: string | undefined = import.meta.env.VITE_DIRECTUS_TOKEN;

const HEADERS: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

if (AUTH_TOKEN != null) {
    HEADERS["Authorization"] = `Bearer ${AUTH_TOKEN}`;
};

const axiosParamsWithDirectus: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_DIRECTUS_API,
    headers: HEADERS,
};


// Axios instances
const axiosInstance: AxiosInstance = axios.create(axiosParamsWithDirectus);

const errorInterceptor = (error: AxiosError): Promise<AxiosError> => {
    console.log("error", error.config);
    // check if it's a server error
    if (!error.response) {
        return Promise.reject(error);
    }

    // all the error responses
    switch (error.response.status) {
    case 401:
        break;
    default:
        // Handle other status codes if needed
        break;
    }
    return Promise.reject(error);
};

// Success responses
const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response;
};

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);


const apiMethods = (axiosInstance: AxiosInstance) => {
    return {
        get: (url: string, config?: AxiosRequestConfig) => axiosInstance.get(url, config),
        post: (url: string, body: any, config?: AxiosRequestConfig) => axiosInstance.post(url, body, config),
        patch: (url: string, body: any, config?: AxiosRequestConfig) => axiosInstance.patch(url, body, config),
        delete: (url: string, config?: AxiosRequestConfig) => axiosInstance.delete(url, config),
    };
};

export const api = apiMethods(axiosInstance);
export const apiObject = axiosInstance;