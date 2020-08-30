import { BookingInput, Apartment } from './../generated/graphql';
import { gql } from 'apollo-server-express';

export default gql`
  scalar Date

  type Role {
    id: ID!
    name: String
  }

  type User {
    id: ID!
    email: String!
    password: String!
    role: Role
    token: String
    first_name: String
    last_name: String
  }

  type TimeSlot {
    id: ID!
    from: Date!
    to: Date!
  }

  input TimeSlotInput {
    from: Date!
    to: Date!
  }

  type Apartment {
    id: ID!
    name: String!
    description: String
    image: String
    price: Float!
    number_of_rooms: Int!
    time_slots: [TimeSlot]
    owner: User!
  }

  input ApartmentInput {
    name: String!
    description: String!
    image: String!
    price: Float!
    number_of_rooms: Int!
    owner_id: ID!
  }

  type VoucherType {
    id: ID!
    name: String!
  }

  type Voucher {
    id: ID!
    name: String!
    description: String!
    image: String!
    price: Float!
    variant: VoucherType!
    quantity: Int!
    owner: User!
  }

  input VoucherInput {
    name: String!
    description: String!
    image: String!
    price: Float!
    variant: ID!
    quantity: Int!
    owner_id: ID!
  }

  input SignUpInput {
    email: String!
    password: String!
    first_name: String!
    last_name: String!
    role_id: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Error {
    message: String!
  }

  type ApartmentResponse {
    error: Error
    data: Apartment
  }

  type VoucherResponse {
    error: Error
    data: Voucher
  }

  type UserResponse {
    error: Error
    data: User
  }

  type Order {
    id: ID!
    voucher: Voucher!
    variant: VoucherType!
    quantity: Int!
    buyer: User!
  }

  input OrderInput {
    voucher_id: ID!
    variant_id: ID!
    quantity: Int!
    buyer_id: ID!
  }

  type OrderResponse {
    error: Error
    data: Order
  }

  type Booking {
    id: ID!
    apartment: Apartment!
    time_slots: [TimeSlot]!
    number_of_rooms: Int!
    buyer: User!
  }

  input BookingInput {
    apartment_id: ID!
    time_slots: [TimeSlotInput]!
    number_of_rooms: Int!
    buyer_id: ID!
  }

  type BookingResponse {
    error: Error
    data: Booking
  }

  type Query {
    roles: [Role]
    users: [User]
    user(email: String!): User
    voucherTypes: [VoucherType]
    apartments: [Apartment]
    apartment(id: ID!): Apartment
    apartmentsByOwner(owner_id: ID!): [Apartment]
    vouchers: [Voucher]
    voucher(id: ID!): Voucher
    vouchersByOwner(owner_id: ID!): [Voucher]
    orders: [Order]
    order(id: ID!): Order
    bookings: [Booking]
    booking(id: ID!): Booking
    restoreByToken(token: String!): User
  }

  type Mutation {
    signUp(data: SignUpInput!): UserResponse!
    login(data: LoginInput!): UserResponse!
    createApartment(data: ApartmentInput!): ApartmentResponse!
    updateApartment(id: ID!, data: ApartmentInput): ApartmentResponse!
    deleteAparment(id: ID!): ApartmentResponse!
    createVoucher(data: VoucherInput!): VoucherResponse!
    updateVoucher(id: ID!, data: VoucherInput!): VoucherResponse!
    deleteVoucher(id: ID!): VoucherResponse!
    createBooking(data: BookingInput!): BookingResponse!
    updateBooking(id: ID!, data: BookingInput): BookingResponse!
    deleteBooking(id: ID!): BookingResponse!
    createOrder(data: OrderInput!): OrderResponse!
    updateOrder(id: ID!, data: OrderInput!): OrderResponse!
    deleteOrder(id: ID!): OrderResponse!
  }
`;
