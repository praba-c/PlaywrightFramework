import { APIRequestContext, request } from "@playwright/test";

export class BaseApi {
    api: APIRequestContext;

    async init() {
        this.api = await request.newContext({
            baseURL: 'https://restful-booker.herokuapp.com'
        });
    }
}