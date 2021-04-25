import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { validateUser } from 'redux/modules';
import { Sidebar } from 'components';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    '@media only screen and (min-width: 601px)': {
      paddingLeft: '320px'
    }
  }
})

export const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.application.user); // eslint-disable-line

  useEffect(() => {
    dispatch(validateUser());
  }, [router]);

  if (!user) return false;

  return (
    <div className={classes.root}>
      <Sidebar/>
      {children}
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node
};
