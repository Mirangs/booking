import React from 'react';
import DashboardLayout from '../components/Layout';
import { Empty } from 'antd';
import { useQuery } from '@apollo/client';

import VouchersList from '../components/VouchersList';
import { getVouchers as getVouchersQuery } from '../queries/vouchers';
import { Voucher } from '../types';

const Vouchers = () => {
  const { data, loading, error } = useQuery<{
    vouchers: Voucher[];
  }>(getVouchersQuery);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  let vouchers: Voucher[] = [];

  if (data) {
    ({ vouchers } = data);
  }

  return (
    <DashboardLayout>
      <h1>Vouchers</h1>
      {vouchers.length ? <VouchersList vouchers={vouchers} /> : <Empty />}
    </DashboardLayout>
  );
};

export default Vouchers;
