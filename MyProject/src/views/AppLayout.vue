<script setup lang="ts">
import AppAside from "@/views/AppAside.vue";
import AppHeader from "@/views/AppHeader.vue";
import {onMounted} from "vue";

</script>

<template>
  <div class="common-layout">
    <el-container>
      <AppAside/>
      <el-container class="header-and-main">
        <AppHeader/>
        <el-main>
          <el-scrollbar>
            <RouterView/>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style>
.header-and-main {
  flex-direction: column;
  height: 100vh;
}

.el-main {
  padding-right: 0;
}
</style>
