import app, { init } from "@/app";
import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import {
    createUser,
    createEnrollmentWithAddress,
    createTicket,
    createTicketType,
  } from "../factories";

beforeAll(async () => {
    await init();
  });
  
  beforeEach(async () => {
    await cleanDb();
  });
  
  const server = supertest(app);
  
  describe("GET /booking", () => {
    it("should respond with status 401 if no token is given", async () => {
      const response = await server.get("/hotels");
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();
  
      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if there is no session for given token", async () => {
      const userWithoutSession = await createUser();
      const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
  
      const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    describe("when token is valid", () => {
        it("should respond with status 404 for invalid hotel id", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType({isRemote: false, includesHotel: true});
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            
            const response = await server.get("/booking").set("Authorization", `Bearer ${token}`);
            expect(response.status).toEqual(httpStatus.NOT_FOUND);           
          });

          it("should respond with status 200 and booking data if user does have a booking", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType({isRemote: false, includesHotel: true});
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
         
            
            const response = await server.get("/booking").set("Authorization", `Bearer ${token}`);
            expect(response.status).toEqual(httpStatus.NOT_FOUND);           
          });
    })


})