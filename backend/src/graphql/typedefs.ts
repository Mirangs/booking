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

  type Query {
    roles: [Role]
    users: [User]
    user(email: String!): User
    voucherTypes: [VoucherType]
    apartments: [Apartment]
    apartment(id: ID!): Apartment
    vouchers: [Voucher]
    voucher(id: ID!): Voucher
  }

  type Mutation {
    signUp(data: SignUpInput): UserResponse!
    login(data: LoginInput): UserResponse!
    createApartment(data: ApartmentInput): ApartmentResponse!
    updateApartment(id: ID!, data: ApartmentInput): ApartmentResponse!
    deleteAparment(id: ID!): ApartmentResponse!
    createVoucher(data: VoucherInput): VoucherResponse!
    updateVoucher(id: ID!, data: VoucherInput): VoucherResponse!
    deleteVoucher(id: ID!): VoucherResponse!
  }
`;
