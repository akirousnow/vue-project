import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";

interface Token {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  user_id: string;
}

const useTokenStore = defineStore("myToken", () => {
  const tokenJson = ref("");
  const token = computed<Token>(() => {
    try {
      return JSON.parse(
        tokenJson.value || window.localStorage.getItem("token") || "{}"
      );
    } catch (e) {
      ElMessage.error("token解析失败");
      window.localStorage.setItem("token", "");
      throw e;
    }
  });

  function saveToken(data: string) {
    tokenJson.value = data;
    window.localStorage.setItem("token", data);
  }

  return {
    token,
    saveToken,
  };
});

export default useTokenStore;
