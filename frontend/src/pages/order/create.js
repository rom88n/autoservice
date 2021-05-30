import React from 'react';
import Head from 'next/head';
import { DashboardLayout, FormFactory } from 'components';
import { orderFormData } from 'utils';
import { ORDER_CREATE } from 'apollo/queries';
import { showMessage } from '../../redux/modules';

const createOrder = () => {
  const onSuccess = ({ dispatch, history }) => {
    dispatch(showMessage({ type: 'success', text: 'Заказ успешно создан!' }))
    history.replace('/dashboard')
  }

  return (
    <>
      <Head>
        <title>Создать заказа</title>
      </Head>
      <FormFactory
        title="Создать заказ"
        fields={orderFormData}
        submitParams={{
          connectUser: true,
          query: ORDER_CREATE,
          onSuccess,
          dataPath: 'createOrder',
        }}
        buttonLabel="Создать"
      />
    </>
  );
};

createOrder.Layout = DashboardLayout;

export default createOrder;
