<template>
  <MainMenu />
  <div class="main">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainMenu from '@/widgets/MainMenu'
</script>

<style scoped>
.main {
  padding-top: 3rem;
  width: 100vw;
  min-height: 100vh;
  background-color: antiquewhite;
}
</style>
