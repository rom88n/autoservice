import React from 'react';
import { DashboardLayout } from 'components'
import { Dashboard } from 'containers'
import Head from 'next/head';

const dashboard = () => (
  <>
    <Head>
      <title>Заказы</title>
    </Head>
    <Dashboard/>
  </>
);

dashboard.Layout = DashboardLayout

export default dashboard;
