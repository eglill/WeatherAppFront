import {BaseService} from "@/services/base/BaseService";
import type {IWeather} from "@/domain/IWeather";

export class WeatherService extends BaseService {

    private baseUrl = 'weather'

    constructor() {
        super();
    }

    async getWeather(latitude: string, longitude: string): Promise<IWeather | undefined> {
        try {
            const response = await this.axios.get<IWeather>(
                this.baseUrl +
                '?latitude=' +
                latitude +
                '&longitude=' +
                longitude)

            if (response.status === 200) {
                return response.data;
            }
        } catch (e) {
            console.log(e);
        }
        return undefined;
    }

    async getWeatherImage(weatherCode: string): Promise<string | undefined> {
        try {
            const response = await this.axios.get<Blob>(
                this.baseUrl +
                '/image/' +
                weatherCode,
                {responseType: 'blob'})

            if (response.status === 200) {
                return await this.blobToBase64(response.data);
            }
        } catch (e) {
            console.log(e);
        }
        return undefined;
    }

    private async blobToBase64(blob: Blob): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                resolve(base64String.split(',')[1]); // Extract only the base64 string
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(blob);
        });
    }
}