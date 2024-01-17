import {BaseService} from "@/services/base/BaseService";
import type {ILocation} from "@/domain/ILocation";
import { AppConfig } from "../../config";



export class LocationService extends BaseService {

    private baseUrl = 'location?query='

    constructor() {
        super();
    }

    async getLocations(query: string): Promise<ILocation[]> {
        try {
            const response = await this.axios.get<ILocation[]>(
                this.baseUrl +
                query +
                '&limit=' +
                AppConfig.locationItemsLimit)

            if (response.status === 200) {
                return response.data;
            }
        } catch (e) {
            console.log(e);
        }
        return [];
    }
}