import { endpoints } from "../../config/endpoints";
import { BaseApi } from "./BaseApi";

export class BookingApi extends BaseApi {

    async createBooking(data: any) {
        return this.api.post(endpoints.booking, {
            data
        });
    }

    async updateBooking(id: string, token: string, data: any) {
        return this.api.put(`${endpoints.booking}/${id}`, {
            headers: { cookie: `token=${token}` },
            data
        });
    }

    async patchBooking(id: string, token: string, data: any) {
        return this.api.patch(`${endpoints.booking}/${id}`, {
            headers: { cookie: `token=${token}` },
            data
        });
    }

    async getBooking(id: string) {
        return this.api.get(`${endpoints.booking}/${id}`);
    }

    async deleteBooking(id: string, token: string) {
        return this.api.delete(`${endpoints.booking}/${id}`, {
            headers: { cookie: `token=${token}` }
        });
    }
}