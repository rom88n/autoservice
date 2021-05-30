import React, { memo, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import mapValues from 'lodash/mapValues';
import { useDispatch, useSelector } from 'react-redux';

import { getFormData, clearFormConfig, submitFormData } from 'redux/modules';
import validateSchema from './helpers/validateSchema';

const useStyles = makeStyles({
  form: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column'
  },
  block: {
    margin: '1rem 0 !important'
  },
  submit: {
    marginTop: '.5rem',
    width: '320px',
    alignSelf: 'center'
  },
  title: {
    margin: '1rem 0'
  },
  createdAt: {
    fontSize: '.7rem',
    opacity: '.8'
  }
});

const Form = memo(({ disabled, title, fields, buttonLabel, handleSubmit, initialValues, withCreatedDate }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: validateSchema(fields)
  });
  const { values, errors, handleChange } = formik;

  const noAccess = disabled && disabled(initialValues)

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      {title && (
        <Typography component="div" variant="h4" align="center" className={classes.title}>
          {title}
        </Typography>
      )}
      {withCreatedDate && (
        <Typography component="div" align="right" className={classes.createdAt}>
          Дата создания: {initialValues.createdAt ? moment(initialValues.createdAt).format('HH:mm DD.MM.YYYY') : 'Invalid date'}
        </Typography>
      )}

      <div className="row">
        {fields.map(({ required, className, component: Component, name, formatting, ...item }) => {
          return (
            <div className={className} key={name}>
              <Component
                fullWidth
                size="small"
                {...item}
                name={name}
                disabled={noAccess}
                className={classes.block}
                value={values[name]}
                onChange={handleChange}
                helperText={errors[name]}
                error={Boolean(errors[name])}
              />
            </div>
          );
        })}
      </div>

      <Button
        fullWidth
        color="primary"
        variant="contained"
        type="submit"
        className={classes.submit}
        disabled={formik.isSubmitting || noAccess}
      >
        {buttonLabel}
      </Button>

    </form>
  );
});

Form.propTypes = {
  fields: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  title: PropTypes.string,
  withCreatedDate: PropTypes.bool,
  disabled: PropTypes.func,
};

export const FormFactory = ({ getValuesParams, fields, submitParams, ...rest }) => {
  const dispatch = useDispatch();
  const form = useSelector(store => store.form);
  const { initialValues } = form;

  const handleSubmit = (values, helpers) => {
    const newData = mapValues(values, (item, key) => {
      const field = key && fields.find(item => item.name === key);
      if (field?.formatting) return field.formatting(item);
      return item;
    });

    dispatch(submitFormData({
      ...submitParams,
      values: newData
    }, helpers));
  };

  useEffect(() => {
    if (getValuesParams) dispatch(getFormData(getValuesParams));

    return () => {
      dispatch(clearFormConfig());
    };
  }, []);

  if (getValuesParams && isEmpty(initialValues)) return false;

  return (
    <Form
      handleSubmit={handleSubmit}
      fields={fields}
      initialValues={initialValues}
      {...rest}
    />
  );
};

FormFactory.propTypes = {
  fields: PropTypes.array.isRequired,
  submitParams: PropTypes.object,
  getValuesParams: PropTypes.object,
  connectUser: PropTypes.bool
};

FormFactory.defaultProps = {
  submitParams: {}
};
