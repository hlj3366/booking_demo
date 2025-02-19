import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  phone: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  tableSize: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
});

export default mongoose.model('Booking', bookingSchema);
