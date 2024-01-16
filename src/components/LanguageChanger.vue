<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import { useLocaleStore } from "@/stores/localeStore";


interface LanguageOption {
  value: string;
  label: string;
}

const i18n = useI18n();

const importLanguageFile = async (lang: string) => {
  try {
    const module = await import(`../i18n/translations/${lang}.json`);
    return module.default || module;
  } catch (error) {
    console.error(`Error importing ${lang}.json:`, error);
    return {};
  }
};

const availableLanguages: string[] = i18n.availableLocales;

const languageOptions = ref<LanguageOption[]>([]);

const loadLanguageOptions = async () => {
  languageOptions.value = await Promise.all(availableLanguages.map(async (lang) => {
    const languageFile = await importLanguageFile(lang);
    return {
      value: lang,
      label: languageFile.language || lang,
    };
  }));
};

const handleLocaleChange = (event: Event) => {
  const newLocale = (event.target as HTMLSelectElement).value;
  useLocaleStore().setLocale(newLocale)
};

onMounted(loadLanguageOptions);
</script>

<template>
    <div class="locale-changer">
      <select v-model="$i18n.locale" @change="handleLocaleChange">
        <option v-for="languageOption in languageOptions" :key="`locale-${languageOption.value}`" :value="languageOption.value">
          {{ languageOption.label }}
        </option>
      </select>
    </div>
</template>

<style scoped>

</style>