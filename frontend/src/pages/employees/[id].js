import React from 'react';
import Head from 'next/head';
import { DashboardLayout, FormFactory } from 'components';
import { userFormData } from 'utils';
import { useRouter } from 'next/router';
import { USER_BY_ID, USER_UPDATE } from 'apollo/queries';
import { showMessage } from 'redux/modules';
import { useSelector } from 'react-redux';
import { accessLevels } from '../../helpers/accessLevels';

const userById = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector((state) => state.application.user);

  if (!id) return false;

  const onSuccess = ({ dispatch, helpers }) => {
    dispatch(showMessage({ type: 'success', text: 'Пользователь успешно обновлён!' }))
    helpers.setSubmitting(false)
  }

  const hasPermission = (data) => {
    const hasPermission = data?.user?.some(i => i.id === user.id)
      || accessLevels.slice(0, 2).includes(user.accessLevel);

    return !hasPermission;
  };

  return (
    <>
      <Head>
        <title>Редактирование пользователь</title>
      </Head>
      <FormFactory
        title="Редактирование пользователя"
        fields={userFormData}
        disabled={hasPermission}
        submitParams={{
          onSuccess,
          variables: { id },
          query: USER_UPDATE,
          dataPath: 'updateUser',
        }}
        buttonLabel="Сохранить"
        getValuesParams={{
          query: USER_BY_ID,
          variables: { id },
          dataPath: 'User',
        }}
      />
    </>
  );
};

userById.Layout = DashboardLayout;

export default userById;
