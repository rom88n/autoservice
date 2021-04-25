// base
import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'components';

export const GlobalSpinner = () => {
  const globalLoading = useSelector((state) => state.application.globalLoading);

  if (globalLoading) return <Spinner/>;
  return <div/>;
};
