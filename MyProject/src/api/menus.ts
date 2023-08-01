import requests from "@/utils/requests.ts"

type Common<T> = {
  code: string;
  data: T;
  mesg: string;
  time: string;
}
export type MenuItem = {
  createdBy: string;
  createdTime: string;
  description: string;
  icon: string;
  id: number;
  name: string;
  updatedBy: string;
  updatedTime: string;
  level: number;
  operatorId: number | null;
  orderNum: number;
  parentId: number;
  shown: boolean;
  href: string;
}
type MenuForm = Partial<MenuItem>
export const getMenus = () => {
  return requests<Common<MenuItem[]>>({
    url: "/boss/menu/getAll",
    method: "GET",
  });
}
export const saveOrUpdateMenu = (data: MenuForm) => {
  return requests<Common<MenuItem>>({
    url: "/boss/menu/saveOrUpdate",
    method: "POST",
    data: data,
  });
}