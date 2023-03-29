import dotenv from "dotenv";
dotenv.config()
// dotenv.config({
//     path: '../.env.test'
// });
import supertest from 'supertest'
import app from '../app'
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import { AppMent, AppMentType } from "../model/appoints";

const testApp = supertest(app);

describe("appointment test", ()=>{
    let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {});
  });

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  });

  afterEach(async () => {
    await AppMent.deleteMany()
    // await mongoose.connection.db.dropDatabase();
  })
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
        const DBContent = await AppMent.find()
        expect(DBContent).toHaveLength(1)
        expect(DBContent[0].startDate).toBe(startDate)
        expect(response.status).toBe(200)
    });
}) 