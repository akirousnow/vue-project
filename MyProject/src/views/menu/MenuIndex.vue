<script setup lang="ts">

import {useRouter} from "vue-router";
import {useMenus} from "@/composables/useMenus.ts";

const router = useRouter()
const {allMenus, getAllMenus} = useMenus()
getAllMenus()
</script>

<template>
  <h1>菜单列表</h1>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button @click="()=>router.push({name:'menus-create'})">添加菜单</el-button>

      </div>
    </template>
    <el-table :data="allMenus" border style="width: 100%">
      <el-table-column type="index" label="序号" width="auto" align="center"/>
      <el-table-column prop="name" label="菜单名称" align="center"/>
      <el-table-column prop="level" label="菜单层级" align="center"/>
      <el-table-column prop="icon" label="菜单图标" align="center"/>
      <el-table-column prop="orderNum" label="排序" align="center"/>
      <el-table-column label="操作">
        <el-button type="primary" size="mini">编辑</el-button>
        <el-button type="danger" size="mini">删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}
</style>