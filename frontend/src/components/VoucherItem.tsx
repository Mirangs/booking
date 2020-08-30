import React from 'react';
import { Voucher } from '../types';
import { Card, Col, Button } from 'antd';
import { useStore } from 'effector-react';

import { $user } from '../store/user';

const VoucherItem: React.FC<Voucher> = ({
  name,
  description,
  image,
  price,
  quantity,
  variant,
}) => {
  const { role_name } = useStore($user);

  const BottomButton = () =>
    role_name !== 'Buyer' ? (
      <Button type='primary'>Edit voucher</Button>
    ) : (
      <Button type='primary'>Buy voucher(s)</Button>
    );

  return (
    <Col span={4}>
      <Card cover={<img alt='voucher image' src={image} />}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Price: ${price}</p>
        <p>Quantity: {quantity}</p>
        <p>Variant: {variant.name}</p>
        <BottomButton />
      </Card>
    </Col>
  );
};

export default VoucherItem;
