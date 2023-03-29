import dotenv from "dotenv";
dotenv.config()
// dotenv.config({
//     path: '../.env.test'
// });
import supertest from 'supertest'
import app from '../app'
// import { TestCallback } from '@types/jest';

const testApp = supertest(app);

describe("appointment test", ()=>{
    it("should return 400 when posting an empty body to theendpoint", async () => {
        const response = await testApp.post("/api/appointment");
        expect(response.status).toBe(400);
    });
    it("should write appointment to db and return 200 when posting the right dat", async () => {
        // given

        const [startDate, startTime] = new Date().toISOString().split("T")
        const appointment = {
            startDate,
            startTime,
            endDate:startDate,
            endTime: startTime,
            comment: 'komment'
        }

        // when
        const response = await testApp.post("/api/appointment").send(appointment);

        // then
        expect(response.status).toBe(200);
    });
}) 