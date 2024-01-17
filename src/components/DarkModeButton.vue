<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark()
const toggleDark = useToggle(isDark);
</script>

<template>
  <button
      title="Toggle Theme"
      @click="toggleDark()"
      class="w-12 h-6 rounded-full p-1 bg-gray-400 dark:bg-gray-600 relative transition-colors duration-500 ease-in focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-600 focus:border-transparent">
    <div id="toggle" class="rounded-full w-4 h-4 bg-gray-600 dark:bg-gray-500 relative  ml-0 dark:ml-6 pointer-events-none transition-all duration-300 ease-out">
    </div>
  </button>
</template>

<style scoped>

</style>