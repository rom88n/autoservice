import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export const LoginForm = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: handleSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>

      <TextField
        fullWidth
        id="login"
        name="login"
        type="login"
        onChange={formik.handleChange}
        value={formik.values.login}
        label="Логин"
        variant="outlined"
        style={{ margin: '.5rem 0' }}
      />

      <TextField
        fullWidth
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        label="Пароль"
        variant="outlined"
        style={{ margin: '.5rem 0' }}
      />

      <Button
        fullWidth
        color="primary"
        variant="contained"
        type="submit"
        style={{ marginTop: '.5rem' }}
      >
        Войти
      </Button>

    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
