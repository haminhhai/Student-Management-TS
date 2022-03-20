import { ListParams, ListResponse, Student } from "models"
import axiosService from "./axiosService"


const studentApi = {
    getAll(params: ListParams): Promise<ListResponse<Student>> {
        const url = '/students'
        return axiosService.get(url, { params })
    },

    getById(id: string): Promise<Student> {
        const url = `/students/${id}`
        return axiosService.get(url)
    },

    add(data: Student): Promise<Student> {
        const url = '/students'
        return axiosService.post(url, data)
    },

    update(data: Partial<Student>): Promise<Student> {
        const url = `/students/${data.id}`
        return axiosService.patch(url, data)
    },

    remove(id: string): Promise<any> {
        const url = `/students/${id}`
        return axiosService.delete(url)
    },
}

export default studentApi