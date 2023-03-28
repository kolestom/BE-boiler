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
    it("gets the test endpoint", async () => {
        const response = await testApp.post("/api/appointment");
        expect(response.status).toBe(400);
    });
}) 