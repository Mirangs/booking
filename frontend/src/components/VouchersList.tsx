import React from 'react';
import { Row, Button } from 'antd';
import { useStore } from 'effector-react';

import { Voucher } from '../types';
import VoucherItem from './VoucherItem';
import { $user } from '../store/user';

export interface VouchersListProps {
  vouchers: Voucher[];
}

const VouchersList: React.FC<VouchersListProps> = ({ vouchers }) => {
  const { role_name } = useStore($user);

  return (
    <>
      {role_name !== 'Buyer' && (
        <Button type='primary' style={{ marginBottom: '20px' }}>
          Add voucher
        </Button>
      )}

      <Row gutter={20}>
        {vouchers.map((voucher) => (
          <VoucherItem {...voucher} />
        ))}
      </Row>
    </>
  );
};

export default VouchersList;
