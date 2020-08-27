import mongoose, { Schema } from 'mongoose';

const VoucherTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: 'voucher_types' }
);

export default mongoose.model('VoucherType', VoucherTypeSchema);
