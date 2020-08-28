import mongoose, { Schema, Document, mongo } from 'mongoose';

export interface IOrder extends Document {
  voucher_id: string;
  variant_id: string;
  quantity: Number;
  buyer_id: string;
}

const OrderSchema = new Schema(
  {
    voucher_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Voucher',
      required: true,
    },
    variant_id: {
      type: mongoose.Types.ObjectId,
      ref: 'VoucherType',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    buyer_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Apartment',
      required: true,
    },
  },
  { collection: 'orders' }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
