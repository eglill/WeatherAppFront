import type {IDay} from "@/domain/IDay";

export interface IWeather {
    latitude: string,
    longitude: string,
    timezone: string,
    days: IDay[]
}