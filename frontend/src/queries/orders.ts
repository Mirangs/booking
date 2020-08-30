import { gql } from '@apollo/client';

export const getOrders = gql`
  query GetOrders {
    orders {
      id
      voucher {
        id
      }
      quantity
    }
  }
`;
