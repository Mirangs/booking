import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
}

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: 'roles' }
);

export default mongoose.model<IRole>('Role', RoleSchema);
