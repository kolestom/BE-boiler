import dotenv from "dotenv";
dotenv.config()

import supertest from 'supertest'
import app from '../app'
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import { User, UserType } from "../model/user";

const testApp = supertest(app);

describe("Google login test", ()=>{
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
    await User.deleteMany()
    // await mongoose.connection.db.dropDatabase();
  })
    
    it("should result in a successful Google login", async () => {
        // given

        const code = "ugghvkvkhbhjk"        
        // HF: getIdToken mockolasa jest-el
        
        // when
        const response = await testApp.post("/api/login").send({code});
        // then
        const DBContent = await User.find()
        expect(DBContent).toHaveLength(0)
        expect(response.status).toBe(401)
    });
}) 