import { test, expect } from "@playwright/test";
import testData from "../data/testData.json";
import { AuthApi } from "../api/clients/AuthApi";
import { BookingApi } from "../api/clients/BookingApi";
import { validateSchema } from "../api/utils/schemaValidator";
import { bookingSchema } from "../api/contracts/booking.schema";

test.use({
    storageState: undefined
});

test.describe('API', () => {

    test.describe.configure({ mode: 'serial' });

    let authApi: AuthApi
    let bookingApi: BookingApi
    let bookingId: string;
    let token: string

    test.beforeAll('Context', async () => {
        authApi = new AuthApi();
        bookingApi = new BookingApi();

        await authApi.init();
        await bookingApi.init();
    });

    test('Generate token', async () => {
        token = await authApi.generateToken('admin', 'password123');
        expect(token).toBeTruthy();
    });

    test('POST', async () => {
        const response = await bookingApi.createBooking(testData.api.post);
        expect(response.status()).toEqual(200);
        
        const body = await response.json();
        bookingId = body.bookingid;
    });

    test('PUT', async () => {
        const response = await bookingApi.updateBooking(bookingId, token, testData.api.put);
        validateSchema(bookingSchema, await response.json());
        expect(response.status()).toBe(200);
    });

    test('PATCH', async () => {
        const response = await bookingApi.patchBooking(bookingId, token, testData.api.patch);
        validateSchema(bookingSchema, await response.json());
        expect(response.status()).toBe(200);
    });

    test('GET', async () => {
        const response = await bookingApi.getBooking(bookingId);
        validateSchema(bookingSchema, await response.json());
        expect(response.status()).toBe(200);
    });

    test('DELETE', async () => {
        const response = await bookingApi.deleteBooking(bookingId, token)
        expect(response.status()).toBe(201);
    });

    test('GET after DELETE', async () => {
        const response = await bookingApi.getBooking(bookingId);
        expect(response.status()).toBe(404);
    });
});