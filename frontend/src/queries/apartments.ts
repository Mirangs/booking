import { gql } from '@apollo/client';

export const getApartments = gql`
  query GetApartments {
    apartments {
      id
      name
      description
      image
      price
      number_of_rooms
      time_slots {
        from
        to
      }
    }
  }
`;
