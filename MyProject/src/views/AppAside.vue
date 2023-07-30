<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
import isCollapse from './isCollapse.ts'
</script>

<template>
  <el-aside>
    <el-scrollbar>
      <el-menu unique-opened :collapse="isCollapse" router>
        <a href="/" class="logo">
          <img src="@/assets/logo.svg" alt="" />
          <h1>夜雪</h1>
        </a>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Setting /> </el-icon>
            <span>权限管理</span>
          </template>

          <el-menu-item index="/menus">
            <el-icon><Setting /> </el-icon>
            <span>菜单列表</span>
          </el-menu-item>
          <el-menu-item index="/resources">
            <el-icon><Setting /> </el-icon>
            <span>资源列表</span>
          </el-menu-item>
          <el-menu-item index="/roles">
            <el-icon><Setting /> </el-icon>
            <span>角色列表</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/users">
          <el-icon><Setting /> </el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/course">
          <el-icon><Setting /> </el-icon>
          <span>课程管理</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Setting /> </el-icon>
            <span>广告管理</span>
          </template>
          <el-menu-item index="/advertisement">
            <el-icon><Setting /> </el-icon>
            <span>广告列表管理</span>
          </el-menu-item>
          <el-menu-item index="/advertisement-space">
            <el-icon><Setting /> </el-icon>
            <span>广告位管理</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  width: auto;
  background-color: #e6e8eb;
}
.el-menu {
  width: 200px;
  background-color: #e6e8eb;
  border-right: none;
  &.el-menu--collapse {
    width: 64px;
    &h1 {
      display: none;
    }
  }
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 60px;
  color: black;
  img {
    width: 40px;
    height: 40px;
  }
}
</style>
