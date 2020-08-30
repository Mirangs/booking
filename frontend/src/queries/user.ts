import { gql } from '@apollo/client';

export const restoreByToken = gql`
  query RestoreByToken($token: String!) {
    restoreByToken(token: $token) {
      role {
        name
      }
      email
    }
  }
`;
