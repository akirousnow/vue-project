import axios, {AxiosRequestHeaders} from "axios";
import useTokenStore from "@/stores/mytoken.ts";
import {refreshToken} from "@/api/users.ts";
import {ElMessage} from "element-plus";
import router from "@/router/index.ts";

const requests = axios.create({
  baseURL: "http://39.97.218.60/",
});
requests.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }
  const store = useTokenStore();
  config.headers.Authorization = store.token?.access_token;
  return config;
});
requests.interceptors.response.use((response) =>
    response,
  async (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized");
      const {data} = await refreshToken()
      if (data.success) {
        const store = useTokenStore();
        store.saveToken(data.content);
        return requests(error.config);
      } else {
        ElMessage.error("登陆过期，请重新登陆");
        await router.push("/login")
        return
      }
    }
    return Promise.reject(error);
  })
export default requests;
