import requests from "@/utils/requests.ts";

type LoginInfo = {
  phone: string;
  password: string;
  code?: string;
};
type LoginResult = {
  success: boolean;
  status: number;
  message: string;
  content: string;
};
const login = (data: LoginInfo) =>
  requests<LoginResult>({
    url: "/front/user/login",
    method: "POST",
    data: `phone=${data.phone}&password=${data.password}`,
  });
type UserInfo = {
  success: boolean;
  message: string;
  state: number;
  content: {
    isUpdatedPassword: boolean;
    portrait: string;
    userName: string;
  };
};
const getInfo = () => {
  return requests<UserInfo>({
    url: "/front/user/getInfo",
    method: "GET",
  });
};
const logout = () => {
  return requests({
    url: "/front/user/logout",
    method: "POST",
  });
};
export { login, getInfo, logout };
