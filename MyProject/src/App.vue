<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import requests from './utils/requests'
requests({
  url: '/front/ad/getAdList',
  method: 'get'
}).then((res) => {
  console.log(res)
})
</script>

<template><RouterView /></template>
