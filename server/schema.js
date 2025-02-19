import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Booking {
    id: ID!
    guestName: String!
    phone: String!
    arrivalTime: String!
    tableSize: Int!
    status: String!
  }

  type Query {
    bookings(date: String, status: String): [Booking]
    booking(id: ID!): Booking
  }

  type Mutation {
    createBooking(
      guestName: String!
      phone: String!
      arrivalTime: String!
      tableSize: Int!
    ): Booking
    
    updateBooking(
      id: ID!
      guestName: String
      phone: String
      arrivalTime: String
      tableSize: Int
      status: String
    ): Booking
    
    cancelBooking(id: ID!): Booking
    completeBooking(id: ID!): Booking
  }
`;

export default typeDefs;
