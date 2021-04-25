import { useEffect, memo } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import { showMessage } from 'redux/modules'

export const MessageContainer = memo(() => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const message = useSelector(store => store.application.message);

  useEffect(() => {
    if (message) {
      enqueueSnackbar(
        message.text,
        {
          variant: message.type,
          preventDuplicate: true,
          autoHideDuration: 2000,
        });
      dispatch(showMessage(null))
    }
  }, [message]);

  return false;
});
