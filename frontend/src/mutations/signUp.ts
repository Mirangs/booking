import { gql } from '@apollo/client';

export const signUp = gql`
  mutation SignUp($data: SignUpInput!) {
    signUp(data: $data) {
      error {
        message
      }
    }
  }
`;
