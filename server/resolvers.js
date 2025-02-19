import Booking from './models/Booking.js';

const resolvers = {
  Query: {
    async bookings(_, { date, status }) {
      const query = {};
      if (date) query.arrivalTime = { $regex: date };
      if (status) query.status = status;
      return await Booking.find(query);
    },
    async booking(_, { id }) {
      return await Booking.findById(id);
    },
  },
  Mutation: {
    async createBooking(_, { guestName, phone, arrivalTime, tableSize }) {
      const booking = new Booking({
        guestName,
        phone,
        arrivalTime,
        tableSize,
        status: 'Pending',
      });
      return await booking.save();
    },
    async updateBooking(_, { id, ...args }) {
      return await Booking.findByIdAndUpdate(id, args, { new: true });
    },
    async cancelBooking(_, { id }) {
      return await Booking.findByIdAndUpdate(
        id,
        { status: 'Cancelled' },
        { new: true }
      );
    },
    async completeBooking(_, { id }) {
      return await Booking.findByIdAndUpdate(
        id,
        { status: 'Completed' },
        { new: true }
      );
    },
  },
};

export default resolvers;
