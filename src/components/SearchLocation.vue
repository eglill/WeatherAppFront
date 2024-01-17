<script setup lang="ts">
import { ref } from 'vue';
import type {ILocation} from "@/domain/ILocation";

const searchQuery = ref('');

defineProps<{
  fetchedLocations: ILocation[];
}>()
const emit = defineEmits(['search', 'locationSelected', 'resetLocations']);

const searchLocation = () => {
  if (searchQuery.value.trim() !== '') {
    emit('search', searchQuery.value)
  }
}

const selectLocation = (location: ILocation) => {
  searchQuery.value = "";
  emit('resetLocations');
  emit('locationSelected', location);
};
</script>

<template>
  <div class="pt-4 mb-8 relative">
    <input v-model="searchQuery" @keyup.enter="searchLocation" type="text" :placeholder="$t('searchLocation')"
           class="py-2 px-1 w-full bg-transparent border-b focus:border-light-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71] dark:focus:border-dark-secondary">
    <ul v-if="fetchedLocations.length > 0" class="absolute bg-light-secondary text-black w-full shadow-md py-2 px-1 top-[66px] dark:bg-dark-secondary dark:text-white">
      <li v-for="(location, index) in fetchedLocations" :key="index" @click="selectLocation(location)"
          class="py-2 cursor-pointer">
        {{ location.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>