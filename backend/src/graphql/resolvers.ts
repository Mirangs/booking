import {
  ApartmentInput,
  ApartmentResponse,
  VoucherInput,
  VoucherResponse,
} from './../generated/graphql';

import UserModel from '../models/user';
import RoleModel from '../models/role';
import VoucherTypeModel from '../models/voucherType';
import ApartmentModel from '../models/apartment';
import VoucherModel from '../models/voucher';

import {
  User,
  LoginInput,
  SignUpInput,
  Apartment,
  Voucher,
  UserResponse,
} from '../generated/graphql';
import { SchemaError } from 'apollo-server-express';

export default {
  Query: {
    roles: async () => await RoleModel.find(),
    users: async () => await UserModel.find(),
    user: async (_: void, { email }: { email: string }) =>
      await UserModel.findOne({ email }),
    voucherTypes: async () => await VoucherTypeModel.find(),
    apartments: async () => await ApartmentModel.find(),
    apartment: async (_: void, { id }: { id: string }) =>
      await ApartmentModel.findById(id),
    vouchers: async () => await VoucherModel.find(),
    voucher: async (_: void, { id }: { id: string }) =>
      await VoucherModel.findById(id),
  },
  Mutation: {
    signUp: async (
      _: void,
      { data }: { data: SignUpInput }
    ): Promise<UserResponse> => {
      try {
        const sellerRole = await RoleModel.findOne({ name: 'Seller' });
        if (!sellerRole) {
          return {
            error: { message: 'Cannot find seller role' },
          };
        }

        const isUserExists = await UserModel.findOne({ email: data.email });
        if (isUserExists) {
          return {
            error: { message: 'User is already exists' },
          };
        }

        try {
          const createdUser = await UserModel.create({
            ...data,
            role_id: sellerRole._id,
          });
          return {
            data: createdUser as any,
          };
        } catch (err) {
          console.error(`Cannot create user: ${err}`);
          return { error: { message: 'Cannot create user' } };
        }
      } catch (err) {
        console.error(`Error at signUp resolver: ${err}`);
        return { error: { message: err } };
      }
    },
    login: async (
      _: void,
      { data }: { data: LoginInput }
    ): Promise<UserResponse> => {
      const { email, password } = data;
      const user = await UserModel.findOne({ email });

      if (!user) {
        return {
          error: {
            message: 'User does not exist',
          },
        };
      }

      if (!(await user.validatePassword(password))) {
        return {
          error: { message: 'Email or password is incorrect' },
        };
      }

      const token = await user.generateAuthToken();
      return {
        data: { ...user, token } as any,
      };
    },
    createApartment: async (
      _: void,
      { data }: { data: ApartmentInput }
    ): Promise<ApartmentResponse> => {
      const {
        name,
        number_of_rooms,
        price,
        description = '',
        image = '',
        owner_id,
      } = data;

      if (!name || !number_of_rooms || !price || !owner_id) {
        return {
          error: { message: 'Need to fill required fields' },
        };
      }

      const isOwnerFound = await UserModel.findById(owner_id);
      if (!isOwnerFound) {
        return {
          error: { message: 'Owner not found' },
        };
      }

      try {
        const apartment = await ApartmentModel.create({
          name,
          number_of_rooms,
          price,
          description,
          image,
          owner_id,
        });
        return { data: apartment as any };
      } catch (err) {
        console.error(`Error at createApartment resolver: ${err}`);
        return {
          error: { message: 'Something went wrong' },
        };
      }
    },
    updateApartment: async (
      _: void,
      { data, id }: { id: string; data: ApartmentInput }
    ): Promise<ApartmentResponse> => {
      const {
        name,
        number_of_rooms,
        price,
        description = '',
        image = '',
        owner_id,
      } = data;

      if (!name || !number_of_rooms || !price || !owner_id) {
        return {
          error: { message: 'Need to fill required fields' },
        };
      }

      const isApartmentFound = await ApartmentModel.findById(id);
      if (!isApartmentFound) {
        return { error: { message: 'Apartment not found' } };
      }

      const isOwnerFound = await UserModel.findById(owner_id);
      if (!isOwnerFound) {
        return {
          error: { message: 'Owner not found' },
        };
      }

      try {
        await ApartmentModel.updateOne(
          { _id: id },
          {
            name,
            number_of_rooms,
            price,
            description,
            image,
            owner_id,
          }
        );
        return { data: (await ApartmentModel.findById(id)) as any };
      } catch (err) {
        console.error(`Error at updateApartment resolver: ${err}`);
        return {
          error: { message: 'Something went wrong' },
        };
      }
    },
    deleteAparment: async (
      _: void,
      { id }: { id: string }
    ): Promise<ApartmentResponse> => {
      const apartmentToDelete = await ApartmentModel.findById(id);
      if (!apartmentToDelete) {
        return { error: { message: 'Apartment not found' } };
      }

      try {
        await apartmentToDelete.deleteOne();
        return { data: apartmentToDelete as any };
      } catch (err) {
        console.error(`Error at deleteApartment resolver: ${err}`);
        return { error: { message: 'Cannot delete apartment' } };
      }
    },
    createVoucher: async (
      _: void,
      { data }: { data: VoucherInput }
    ): Promise<VoucherResponse> => {
      const {
        name,
        variant,
        quantity,
        price,
        description = '',
        image = '',
        owner_id,
      } = data;

      if (!name || !variant || !price || !owner_id || !quantity) {
        return {
          error: { message: 'Need to fill required fields' },
        };
      }

      const isVariantFound = await VoucherTypeModel.findById(variant);
      if (!isVariantFound) {
        return { error: { message: 'Variant not found' } };
      }

      const isOwnerFound = await UserModel.findById(owner_id);
      if (!isOwnerFound) {
        return {
          error: { message: 'Owner not found' },
        };
      }

      try {
        const voucher = await VoucherModel.create({
          name,
          variant,
          price,
          description,
          image,
          quantity,
          owner_id,
        });
        return { data: voucher as any };
      } catch (err) {
        console.error(`Error at createVoucher resolver: ${err}`);
        return {
          error: { message: 'Something went wrong' },
        };
      }
    },
    updateVoucher: async (
      _: void,
      { data, id }: { id: string; data: VoucherInput }
    ): Promise<VoucherResponse> => {
      const {
        name,
        variant,
        quantity,
        price,
        description = '',
        image = '',
        owner_id,
      } = data;

      if (!name || !variant || !price || !owner_id || !quantity) {
        return {
          error: { message: 'Need to fill required fields' },
        };
      }

      const isVariantFound = await VoucherTypeModel.findById(variant);
      if (!isVariantFound) {
        return { error: { message: 'Variant not found' } };
      }

      const isVoucherFound = await VoucherModel.findById(id);
      if (!isVoucherFound) {
        return { error: { message: 'Voucher not found' } };
      }

      const isOwnerFound = await UserModel.findById(owner_id);
      if (!isOwnerFound) {
        return {
          error: { message: 'Owner not found' },
        };
      }

      try {
        await VoucherModel.updateOne(
          { _id: id },
          {
            name,
            variant,
            price,
            description,
            image,
            owner_id,
            quantity,
          }
        );
        return { data: (await VoucherModel.findById(id)) as any };
      } catch (err) {
        console.error(`Error at updateVoucher resolver: ${err}`);
        return {
          error: { message: 'Something went wrong' },
        };
      }
    },
    deleteVoucher: async (
      _: void,
      { id }: { id: string }
    ): Promise<VoucherResponse> => {
      const voucherToDelete = await VoucherModel.findById(id);
      if (!voucherToDelete) {
        return { error: { message: 'Voucher not found' } };
      }

      try {
        await voucherToDelete.deleteOne();
        return { data: voucherToDelete as any };
      } catch (err) {
        console.error(`Error at deleteVoucher resolver: ${err}`);
        return { error: { message: 'Cannot delete voucher' } };
      }
    },
  },
  User: {
    role: async (parent: User, _: void) => {
      const user = await UserModel.findById(parent.id);
      if (!user) {
        throw new SchemaError('Cannot find user');
      }
      const role = await RoleModel.findById(user.role_id);
      if (!role) {
        throw new SchemaError('Cannot find role for user');
      }

      return role;
    },
  },
  Apartment: {
    owner: async (parent: Apartment) => {
      const apartment = await ApartmentModel.findById(parent.id);
      const owner = await UserModel.findById(apartment?.owner_id);
      if (!owner) {
        throw new SchemaError('Cannot find owner');
      }

      return owner;
    },
  },
  Voucher: {
    owner: async (parent: Voucher) => {
      const voucher = await VoucherModel.findById(parent.id);
      const owner = await UserModel.findById(voucher?.owner_id);
      if (!owner) {
        throw new SchemaError('Cannot find owner');
      }

      return owner;
    },
    variant: async (parent: Voucher) => {
      const voucher = await VoucherModel.findById(parent.id);
      const variant = await VoucherTypeModel.findById(voucher?.variant);

      if (!variant) {
        throw new SchemaError('Cannot find variant');
      }

      return variant;
    },
  },
};
