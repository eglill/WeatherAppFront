import { createI18n } from 'vue-i18n';
import en from './translations/en.json'
import et from './translations/et.json'
import {AppConfig} from "../../config";

const initialLocale = localStorage.getItem(AppConfig.localeStoreId) || getBrowserLanguage();
const i18n = createI18n({
    locale: initialLocale,
    fallbackLocale: AppConfig.fallbackLanguage,
    legacy: false,
    messages: {
        en,
        et
    }
});

function getBrowserLanguage(): string {
    const browserLanguage = navigator.language.split('-')[0];
    const availableLanguages = getAvailableLanguages();
    const matchedLanguage = availableLanguages.find(lang => lang === browserLanguage);
    return matchedLanguage || AppConfig.fallbackLanguage;
}

export function getAvailableLanguages(): string[] {
    const keys = Object.keys(import.meta.glob('./translations/*.json', { eager:true }));
    return keys.map(key => key.slice(15, -5));
}

export default i18n;