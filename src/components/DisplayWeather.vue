<script setup lang="ts">
import type {IWeather} from "@/domain/IWeather";
import {useI18n} from "vue-i18n";
import {weatherCode} from "@/enums/WeatherCode";

defineProps<{
  weather: IWeather | undefined;
}>();

const isMinus = (value: any) => {
  const stringValue = String(value);
  return stringValue.startsWith('-');
};

const getImageUrl = (base64String: string | undefined) => {
  if (base64String) {
    return `data:image/png;base64,${base64String}`;
  }
  return 'path/to/placeholder-image.png';
};

const { t } = useI18n();

const translateWeatherCode = (weatherCodeValue: string): string => {
  const translation = weatherCode[Number(weatherCodeValue)] || 'N/A';
  return t(`weatherCodes.${translation}`);
};
</script>

<template>
  <div v-if="weather" class="flex flex-col flex-1 items-center">
    <div class="max-w-screen-md w-full flex flex-col items-center text-black dark:text-white">

      <div class="max-w-screen-md w-full">
        <div class="mx-8 text-black dark:text-gray-200">
          <div class="flex">
            <h2 class="mb-4 font-bold flex-1">
              {{$t('sevenDaysWeather')}}
            </h2>
            <h2 class="mb-4 font-bold flex gap-2 flex-1 justify-end">
              {{ weather.locationName }}
            </h2>
          </div>

          <hr class="border-gray-900 border-opacity-10 border w-full dark:border-gray-700" />

          <div v-for="day in weather.days" :key="day.time" class="flex items-center py-5 text-gray-700 dark:text-gray-400">
            <div class="flex-1 text-lg font-bold">
              <p class="flex-1">
                {{ day.time }}
              </p>
              <p class="flex-1 text-sm">
                {{ translateWeatherCode(day.weatherCode) }}
              </p>
            </div>

            <img :src="getImageUrl(day.image)" class="w-[180px] h-[100px] max-md:w-[100px] max-md:h-[100px] ml-10 object-cover object-top rounded-full" alt="Weather Image" />
            <div class="flex gap-2 flex-1 justify-end font-bold">
              <p :class="{ 'text-red-500 dark:text-red-400': !isMinus(day.maxTemperature), 'text-blue-500 dark:text-blue-400': isMinus(day.maxTemperature) }">
                {{ day.maxTemperature }}
              </p>
              <p>/</p>
              <p :class="{ 'text-red-500 dark:text-red-400': !isMinus(day.minTemperature), 'text-blue-500 dark:text-blue-400': isMinus(day.minTemperature) }">
                {{ day.minTemperature }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>