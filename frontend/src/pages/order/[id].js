import React from 'react';
import { DashboardLayout, FormFactory } from 'components';
import { orderFormData } from 'utils';
import { useRouter } from 'next/router';
import { ORDER_BY_ID, ORDER_UPDATE } from 'apollo/queries';
import { useSelector } from 'react-redux';
import { showMessage } from 'redux/modules';
import { accessLevels } from 'helpers/accessLevels';
import Head from 'next/head';

const orderById = () => {
  const router = useRouter();
  const user = useSelector((state) => state.application.user);

  const { id } = router.query;

  if (!id) return false;

  const onSuccess = ({ dispatch, helpers }) => {
    dispatch(showMessage({ type: 'success', text: 'Заказ успешно обновлён!' }));
    helpers.setSubmitting(false);
  };

  const hasPermission = (data) => {
    const hasPermission = data?.user?.some(i => i.id === user.id)
      || accessLevels.slice(0, 2).includes(user.accessLevel);

    return !hasPermission;
  };

  return (
    <>
      <Head>
        <title>Создать заказ</title>
      </Head>
      <FormFactory
        withCreatedDate
        disabled={hasPermission}
        title="Редактирование заказа"
        fields={orderFormData}
        submitParams={{
          onSuccess,
          variables: { id },
          query: ORDER_UPDATE,
          dataPath: 'updateOrder'
        }}
        buttonLabel="Сохранить"
        getValuesParams={{
          query: ORDER_BY_ID,
          variables: { id },
          dataPath: 'Order'
        }}
      />
    </>
  );
};

orderById.Layout = DashboardLayout;

export default orderById;
