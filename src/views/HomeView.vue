<script setup lang="ts">
import LanguageChanger from "@/components/LanguageChanger.vue";
import {LocationService} from "@/services/LocationService";
import {WeatherService} from "@/services/WeatherService";

const locationService = new LocationService();
const weatherService = new WeatherService();

const fetchData = async () => {
  const locationResponse = await locationService.getLocations('Kalamaja');
  const weatherResponse = await weatherService.getWeather(locationResponse[0].latitude, locationResponse[0].longitude);
  console.log(locationResponse);
  console.log(weatherResponse);
};

// Call the async function to fetch data
fetchData();
</script>

<template>
  <main>
    <LanguageChanger/>
  </main>
</template>
