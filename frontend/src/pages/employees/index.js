import React from 'react';
import { DashboardLayout } from 'components'
import { Employees } from 'containers'
import Head from 'next/head';

const index = () => (
  <>
    <Head>
      <title>Пользователи</title>
    </Head>
    <Employees/>
  </>
)

index.Layout = DashboardLayout

export default index;
