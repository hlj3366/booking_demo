import request from 'supertest';
import { startServer } from '../index.js';
import mongoose from 'mongoose';

let server;

beforeAll(async () => {
  server = await startServer();
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe('Booking API', () => {
  test('should create a new booking', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({
        query: `
              mutation {
                createBooking(
                  guestName: "Rechal",
                  phone: "rechal@123.com",
                  arrivalTime: "2025-02-19 19:00",
                  tableSize: 4
                ) {
                  id
                  guestName
                  status
                }
              }
            `,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.createBooking.guestName).toBe('Rechal');
  });
});
