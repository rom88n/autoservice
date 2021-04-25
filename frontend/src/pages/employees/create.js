import React from 'react';
import Head from 'next/head';
import { DashboardLayout, FormFactory } from 'components';
import { userFormData } from 'utils';
import { USER_CREATE } from 'apollo/queries';
import { useSelector } from 'react-redux';
import { showMessage } from '../../redux/modules';
import { accessLevels } from '../../helpers/accessLevels';

const createUser = () => {
  const user = useSelector((state) => state.application.user);

  const onSuccess = ({ dispatch, history }) => {
    dispatch(showMessage({ type: 'success', text: 'Пользователь успешно создан!' }))
    history.replace('/employees')
  }

  const hasPermission = (data) => {
    const hasPermission = data?.user?.some(i => i.id === user.id)
      || accessLevels.slice(0, 2).includes(user.accessLevel);

    return !hasPermission;
  };

  return (
    <>
      <Head>
        <title>Создать пользователя</title>
      </Head>
      <FormFactory
        title="Создать пользователя"
        fields={userFormData}
        disabled={hasPermission}
        submitParams={{
          query: USER_CREATE,
          onSuccess,
          dataPath: 'createUser',
        }}
        buttonLabel="Создать"
      />
    </>
  );
};

createUser.Layout = DashboardLayout;

export default createUser;
