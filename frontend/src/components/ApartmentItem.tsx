import React from 'react';
import { Apartment } from '../types';
import { useStore } from 'effector-react';
import { $user } from '../store/user';
import { Button, Col, Card } from 'antd';

const ApartmentItem: React.FC<Apartment> = ({
  id,
  name,
  description,
  image,
  number_of_rooms,
  price,
  time_slots,
}) => {
  const { role_name } = useStore($user);

  const BottomButton = () =>
    role_name !== 'Buyer' ? (
      <Button type='primary'>Edit apartment</Button>
    ) : (
      <Button type='primary'>Book apartment</Button>
    );

  return (
    <Col span={4}>
      <Card cover={<img alt='apartment image' src={image} />}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Price: ${price}</p>
        <p>Number of rooms: {number_of_rooms}</p>
        <p>Time slots:</p>
        {time_slots.map(({ from, to }) => (
          <p>
            From: {from} To: {to}
          </p>
        ))}
        <BottomButton />
      </Card>
    </Col>
  );
};

export default ApartmentItem;
