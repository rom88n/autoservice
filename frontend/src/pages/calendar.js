import React from 'react';
import Head from 'next/head'
import { DashboardLayout } from 'components'
import { Calendar } from 'containers'

const calendar = () => (
  <>
    <Head>
      <title>Календарь</title>
    </Head>
    <Calendar/>
  </>
)

calendar.Layout = DashboardLayout

export default calendar;
