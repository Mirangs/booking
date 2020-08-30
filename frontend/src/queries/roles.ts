import { gql } from '@apollo/client';

export const getRoles = gql`
  query GetRoles {
    roles {
      id
      name
    }
  }
`;
