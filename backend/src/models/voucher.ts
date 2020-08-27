import mongoose, { Schema, Document } from 'mongoose';

export interface IVoucher extends Document {
  name: string;
  description?: string;
  image?: string;
  price: Number;
  variant: string;
  quantity: Number;
  owner_id: string;
}

const VoucherSchema = new Schema(
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
    variant: {
      type: mongoose.Types.ObjectId,
      ref: 'VoucherType',
    },
    quantity: {
      type: Number,
      default: 0,
    },
    owner_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { collection: 'vouchers' }
);

export default mongoose.model<IVoucher>('Voucher', VoucherSchema);
