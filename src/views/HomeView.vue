<script setup lang="ts">
import {LocationService} from "@/services/LocationService";
import {WeatherService} from "@/services/WeatherService";
import SearchLocation from "@/components/SearchLocation.vue";
import type {ILocation} from "@/domain/ILocation";
import {ref} from "vue";
import type {IWeather} from "@/domain/IWeather";
import DisplayWeather from "@/components/DisplayWeather.vue";

const locationService = new LocationService();
const weatherService = new WeatherService();
const fetchedLocations = ref<ILocation[]>([]);
const fetchedWeather = ref<IWeather>();
const selectedLocation = ref<ILocation>();

const fetchLocations = async (location: string) => {
  fetchedLocations.value = await locationService.getLocations(location);
};

const fetchImages = async () => {
  if (fetchedWeather.value !== undefined) {
    for (let day of fetchedWeather.value?.days) {
      let image = await weatherService.getWeatherImage(day.weatherCode);
      if (image !== undefined) {
        day.image = image;
      }
    }
  }
}

const fetchWeather = async (location: ILocation) => {
  const weather = await weatherService.getWeather(location.latitude, location.longitude);
  if (weather !== undefined && selectedLocation.value !== undefined) {
    weather.locationName = selectedLocation.value.name;
  }
  fetchedWeather.value = weather;
  await fetchImages()
};

const handleSearch = async (locationQuery: string) => {
  if (locationQuery.trim() !== '') {
    await fetchLocations(locationQuery);
  }};

const handleLocationSelected = async (location: ILocation) => {
  selectedLocation.value = location;
  await fetchWeather(location);
};

const resetState = () => {
  fetchedLocations.value = [];
  selectedLocation.value = undefined;
};
</script>

<template>
  <main class="container">
    <div class="pt-4 mb-8 relative">
      <SearchLocation :fetched-locations="fetchedLocations"
                      @search="handleSearch"
                      @locationSelected="handleLocationSelected"
                      @resetLocations="resetState"/>
      <DisplayWeather :weather="fetchedWeather"/>
    </div>
  </main>
</template>
