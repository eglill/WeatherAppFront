import type {AxiosInstance} from "axios";
import {axiosBase} from "@/services/base/AxiosBase";


export abstract class BaseService {
    protected axios: AxiosInstance;

    protected constructor() {
        this.axios = axiosBase;
    }
}