import React from 'react';
import DashboardLayout from '../components/Layout';
import { Empty } from 'antd';
import { useQuery } from '@apollo/client';

import ApartmentsList from '../components/ApartmentsList';
import { getApartments as getApartmentsQuery } from '../queries/apartments';
import { Apartment } from '../types';

const Apartments = () => {
  const { data, loading, error } = useQuery<{
    apartments: Apartment[];
  }>(getApartmentsQuery);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  let apartments: Apartment[] = [];

  if (data) {
    ({ apartments } = data);
  }

  return (
    <DashboardLayout>
      <h1>Apartments</h1>
      {apartments.length ? (
        <ApartmentsList apartments={apartments} />
      ) : (
        <Empty />
      )}
    </DashboardLayout>
  );
};

export default Apartments;
