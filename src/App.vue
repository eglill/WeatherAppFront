<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen font-Roboto text-black bg-light-primary dark:bg-dark-primary dark:text-white">
    <NavigationBar/>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
</style>
