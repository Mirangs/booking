import { gql } from '@apollo/client';

export const getVouchers = gql`
  query GetVouchers {
    vouchers {
      id
      name
      description
      image
      price
      variant {
        name
      }
      quantity
    }
  }
`;
