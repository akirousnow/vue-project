import axios, { AxiosRequestHeaders } from "axios";
import useTokenStore from "@/stores/mytoken.ts";

const requests = axios.create({
  baseURL: "http://39.97.218.60/",
});
requests.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }
  const store = useTokenStore();
  config.headers.Authorization = store.token.access_token;
  return config;
});
export default requests;
