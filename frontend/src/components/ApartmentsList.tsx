import React from 'react';
import { Apartment } from '../types';

import ApartmentItem from './ApartmentItem';
import { Row, Button } from 'antd';
import { useStore } from 'effector-react';
import { $user } from '../store/user';

export interface ApartmentsListProps {
  apartments: Apartment[];
}

const ApartmentsList: React.FC<ApartmentsListProps> = ({ apartments }) => {
  const { role_name } = useStore($user);

  return (
    <>
      {role_name !== 'Buyer' && (
        <Button type='primary' style={{ marginBottom: '20px' }}>
          Add apartment
        </Button>
      )}

      <Row gutter={20}>
        {apartments.map((apartment) => (
          <ApartmentItem {...apartment} />
        ))}
      </Row>
    </>
  );
};

export default ApartmentsList;
