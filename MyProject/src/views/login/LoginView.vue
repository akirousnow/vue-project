<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {login} from "@/api/users.ts";
import useTokenStore from "@/stores/mytoken.ts";
import {useRoute, useRouter} from "vue-router";
// do not use same name with ref
const isLoading = ref(false);
const form = reactive({
  phone: "18201288771",
  password: "111111",
});
const store = useTokenStore();
const router = useRouter();
const route = useRoute();
const formRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  username: [
    {required: true, message: "请输入手机号", trigger: "blur"},
    {
      pattern: /^1\d{10}$/,
      message: "手机号码必须是11位数字",
      trigger: "blur",
    },
  ],
  password: [
    {required: true, message: "请输入密码", trigger: "blur"},
    {min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur"},
  ],
});
const onLogin = async () => {
  isLoading.value = true;
  await formRef.value?.validate().catch((err) => {
    ElMessage.error("请检查输入");
    isLoading.value = false;
    throw err;
  });
  const data = await login(form).then(
    (res) => {
      if (!res.data.success) {
        ElMessage.error(res.data.message);
        isLoading.value = false;
        throw new Error(res.data.message);
      }
      return res.data;
    },
    (err) => {
      ElMessage.error(err);
      throw err;
    }
  );
  //登陆成功
  onLoginSuccess(data);
};
const onLoginSuccess = (data: any) => {
  ElMessage.success("登陆成功");
  store.saveToken(data.content);
  isLoading.value = false;
  router.push((route.query.redirect as string) || "/");
};
</script>

<template>
  <div class="login">
    <el-form
      ref="formRef"
      :rules="rules"
      :model="form"
      label-width="120px"
      label-position="top"
      size="large"
    >
      <h1>登陆</h1>
      <el-form-item prop="phone" label="手机号">
        <el-input v-model="form.phone"/>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="isLoading" type="primary" @click="onLogin"
        >登陆
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login {
  .el-button {
    width: 100%;
  }

  h1 {
    font-size: 30px;
    margin-bottom: 10px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;

  .el-form {
    width: 400px;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
