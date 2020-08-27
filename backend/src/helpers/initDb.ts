import mongoose from 'mongoose';

import UserModel from '../models/user';
import RoleModel from '../models/role';
import VoucherTypeModel from '../models/voucherType';

import { MONGO_URI } from '../config';

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    await RoleModel.insertMany([
      {
        name: 'Buyer',
      },
      {
        name: 'Seller',
      },
    ]);

    const adminRole = await RoleModel.create({
      name: 'Admin',
    });

    const adminUser = {
      email: 'admin@gmail.com',
      password: 'admin',
      role_id: adminRole,
      first_name: 'Admin',
      last_name: 'Admin',
    };

    const res = await UserModel.create(adminUser);
    console.log('Successfully init db, user: ', JSON.stringify(res, null, 2));

    const voucherTypes = [
      { name: 'restaurant' },
      { name: 'club' },
      { name: 'museum' },
      { name: 'cinema' },
    ];
    await VoucherTypeModel.insertMany(voucherTypes);
  } catch (err) {
    `Cannot initialize DB: ${err}`;
  } finally {
    mongoose.disconnect();
  }
})();
