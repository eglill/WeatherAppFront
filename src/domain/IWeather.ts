import type {IDay} from "@/domain/IDay";

export interface IWeather {
    locationName: string,
    latitude: string,
    longitude: string,
    timezone: string,
    days: IDay[]
}