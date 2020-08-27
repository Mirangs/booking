import mongoose, { Schema, Document } from 'mongoose';

export interface IApartment extends Document {
  name: string;
  description?: string;
  image?: string;
  price: Number;
  number_of_rooms: Number;
  time_slots?: {
    from: Date;
    to: Date;
  };
  owner_id: string;
}

const ApartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    price: {
      type: Number,
      required: true,
    },
    number_of_rooms: {
      type: Number,
      required: true,
    },
    time_slots: [],
    owner_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { collection: 'apartments' }
);

export default mongoose.model<IApartment>('Apartment', ApartmentSchema);
