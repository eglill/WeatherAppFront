import {BaseService} from "@/services/base/BaseService";
import type {IWeather} from "@/domain/IWeather";

export class WeatherService extends BaseService {

    private baseUrl = 'weather?latitude='

    constructor() {
        super();
    }

    async getWeather(latitude: string, longitude: string): Promise<IWeather | undefined> {
        try {
            const response = await this.axios.get<IWeather>(
                this.baseUrl +
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
}