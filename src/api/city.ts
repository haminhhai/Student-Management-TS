import { ListResponse, City } from "models"
import axiosService from "./axiosService"

const cityApi = {
    getAll(): Promise<ListResponse<City>> {
        const url = '/cities'
        return axiosService.get(url, { params: {
            _limit: 10,
            _page: 1,
        } })
    }
}

export default cityApi