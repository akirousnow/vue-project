import requests from "@/utils/requests.ts";
import useTokenStore from "@/stores/mytoken.ts";

type CommonReturn<T = string> = {
  success: boolean;
  status: number;
  message: string;
  content: T;
}
type LoginResult = CommonReturn
type UserInfo = CommonReturn<{
  isUpdatedPassword: boolean;
  portrait: string;
  userName: string;
}>
type LoginInfo = {
  phone: string;
  password: string;
  code?: string;
};

//登陆
const login = (data: LoginInfo) =>
  requests<LoginResult>({
    url: "/front/user/login",
    method: "POST",
    data: `phone=${data.phone}&password=${data.password}`,
  });

//获取用户信息
const getInfo = () => {
  return requests<UserInfo>({
    url: "/front/user/getInfo",
    method: "GET",
  });
};
//退出登陆
const logout = () => {
  return requests({
    url: "/front/user/logout",
    method: "POST",
  });
};
//刷新token
let promiseRT: Promise<any>
let isRefreshing = false
const refreshToken = () => {
  if (isRefreshing)
    return promiseRT
  isRefreshing = true
  promiseRT = requests({
    url: "/front/user/refresh_token",
    params: {
      refreshtoken: useTokenStore().token?.refresh_token
    },
    method: "POST",
  }).finally(() => {
    isRefreshing = false
  });
  return promiseRT
}
export {login, getInfo, logout, refreshToken};
