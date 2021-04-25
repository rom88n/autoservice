import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Head from 'next/head';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// components
import { LoginForm } from '../components/Forms';

// redux
import { loggingIn } from '../redux/modules';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    padding: '1rem',
    minWidth: '320px',
    maxWidth: '520px',
    width: '100%',
    borderRadius: '8px'
  }
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.application.user); // eslint-disable-line

  useEffect(() => {
    if (user && history) history.push('/dashboard');
  }, []);

  const handleSubmit = (values, helpers) => dispatch(loggingIn(values, helpers));

  return (
    <div className={classes.root}>
      <Head>
        <title>Авторизация</title>
      </Head>
      <Paper elevation={18} className={classes.paper}>
        <LoginForm
          handleSubmit={handleSubmit}
        />
      </Paper>
    </div>
  );
};

export default Login
