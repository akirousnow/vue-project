<script setup lang="ts">
import { Expand, Fold } from "@element-plus/icons-vue";
import isCollapse from "./isCollapse.ts";
import { getInfo, logout } from "@/api/users.ts";
import { onMounted, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import useTokenStore from "@/stores/mytoken.ts";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useTokenStore();
const userInfo = ref({
  portrait: "",
  userName: "",
});
const handleLogout = async () => {
  await ElMessageBox.confirm("确定退出登录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).catch(() => {
    ElMessage.info("已取消退出");
    throw new Promise(() => {});
  });
  await logout().then((res) => {
    ElMessage.success("退出成功");
    console.log(res.data);
  });
  store.saveToken("");
  await router.push("/login");
};

onMounted(() => {
  getInfo().then((res) => {
    userInfo.value = res.data.content;
  });
});
</script>

<template>
  <el-header>
    <el-icon @click="isCollapse = !isCollapse">
      <Expand v-show="isCollapse" />
      <Fold v-show="!isCollapse" />
    </el-icon>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a href="/">promotion management</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown class="el-dropdown">
      <span class="el-dropdown-link">
        <el-avatar :size="35" :src="userInfo.portrait" />
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  background-color: #ebedf0;
}

.el-header .el-breadcrumb {
  margin-left: 20px;
}

.el-dropdown {
  margin-left: auto;
}
</style>
