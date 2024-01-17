<script setup lang="ts">

import DarkModeButton from "@/components/DarkModeButton.vue";
import LanguageChanger from "@/components/LanguageChanger.vue";
</script>

<template>
  <header class="sticky top-0 bg-light-primary bg-opacity-90 shadow-lg z-50 dark:bg-dark-primary dark:bg-opacity-90">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 py-2">
      <div class="flex gap-3 flex-1 justify-end items-center">
        <DarkModeButton/>
        <LanguageChanger/>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>