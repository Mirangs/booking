import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  apartment_id: string;
  time_slots: [
    {
      from: Date;
      to: Date;
    }
  ];
  number_of_rooms: Number;
  buyer_id: string;
}

const BookingSchema = new Schema(
  {
    apartment_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Apartment',
      required: true,
    },
    time_slots: [],
    number_of_rooms: {
      type: Number,
      required: true,
    },
    buyer_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Apartment',
      required: true,
    },
  },
  { collection: 'bookings' }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);
