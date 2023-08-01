import {getMenus} from "@/api/menus.ts";
import {MenuItem} from "@/api/menus.ts";
import {computed, ref} from "vue";

export function useMenus() {
  const allMenus = ref<MenuItem[]>([])
  const getAllMenus = async () => {
    const {data} = await getMenus()
    if (data.code === '000000') {
      allMenus.value = data.data
    } else {
      throw new Error('获取菜单失败')
    }
  }
  const topMenu =
    computed(() => allMenus.value.filter(item => item.level === 0))
  return {allMenus, getAllMenus, topMenu}
}
