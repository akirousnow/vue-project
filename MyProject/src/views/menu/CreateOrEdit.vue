<script setup lang="ts">
import {getMenus} from "@/api/menus.ts";
import {computed, ref} from "vue";
import {MenuItem} from "@/api/menus.ts";
import {useMenus} from "@/composables/useMenus.ts";

const {getAllMenus, topMenu} = useMenus()
getAllMenus()

console.log(topMenu.value)
</script>

<template>
  <h1>创建或修改菜单</h1>
</template>

<style scoped lang="scss">

</style>