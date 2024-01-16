import {defineStore} from "pinia";
import {AppConfig} from "../../config";

const id = AppConfig.localeStoreId

export const useLocaleStore = defineStore({
    id: id,
    state: () => ({
        locale: getInitialLocale(),
    }),
    getters: {
        currentLocale: (state) => state.locale,
    },
    actions: {
        setLocale(newLocale: string) {
            this.locale = newLocale;
            localStorage.setItem(id, newLocale);
        },
    },
});

function getInitialLocale() {
    return localStorage.getItem(id) || AppConfig.fallbackLanguage;
}