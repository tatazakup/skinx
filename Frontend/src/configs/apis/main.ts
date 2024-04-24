import Axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const MainAxios = Axios.create({
  baseURL: "http:///127.0.0.1:6868/api/v1",
  withCredentials: true,
});

MainAxios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  request.headers["Content-Type"] = "application/json";
  return request;
});

MainAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(response.data);
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
