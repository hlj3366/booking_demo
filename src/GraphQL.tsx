import { gql } from "@apollo/client";

export const GET_BOOKINGS = gql`
  query GetBookings($date: String, $status: String) {
    bookings(date: $date, status: $status) {
      id
      guestName
      phone
      arrivalTime
      tableSize
      status
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation CreateBooking(
    $guestName: String!
    $phone: String!
    $arrivalTime: String!
    $tableSize: Int!
  ) {
    createBooking(
      guestName: $guestName
      phone: $phone
      arrivalTime: $arrivalTime
      tableSize: $tableSize
    ) {
      id
      guestName
      status
    }
  }
`;

export const UPDATE_BOOKING = gql`
  mutation UpdateBooking(
    $id: ID!
    $guestName: String
    $phone: String
    $arrivalTime: String
    $tableSize: Int
    $status: String
  ) {
    updateBooking(
      id: $id
      guestName: $guestName
      phone: $phone
      arrivalTime: $arrivalTime
      tableSize: $tableSize
      status: $status
    ) {
      id
      guestName
      phone
      arrivalTime
      tableSize
      status
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($id: ID!) {
    cancelBooking(id: $id) {
      id
      status
    }
  }
`;

export const COMPLETE_BOOKING = gql`
  mutation CompleteBooking($id: ID!) {
    completeBooking(id: $id) {
      id
      status
    }
  }
`;
