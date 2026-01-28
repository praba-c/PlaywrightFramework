import { BaseApi } from "./BaseApi";
import { endpoints } from "../../config/endpoints";

export class AuthApi extends BaseApi {

    async generateToken(username: string, password: string) {
        const response = await this.api.post(endpoints.auth, {
            data: { username, password }
        });
        const body = await response.json();
        return body.token;
    }
}