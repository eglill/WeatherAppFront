import axios from 'axios';
import { AppConfig } from "../../../config";

export const axiosBase = axios.create({
    baseURL: AppConfig.baseUrl,
    // headers: {
    //     common: {'Content-Type': 'application/json'}
    // }
});