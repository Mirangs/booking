import { gql } from '@apollo/client';

export const login = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      error {
        message
      }
      data {
        token
        role {
          name
        }
      }
    }
  }
`;
