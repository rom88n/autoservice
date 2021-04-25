// base
import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

export const SelectComponent = (props) => {
  const { items = [], label, variant, fullWidth, helperText, size, className, ...rest } = props;

  return (
    <FormControl variant={variant} fullWidth={fullWidth} size={size} className={className}>
      {label && (<InputLabel>{label}</InputLabel>)}
      <Select
        {...rest}
        label={label}
      >
        {items.map(item => (
          <MenuItem
            key={item.value}
            value={item.value}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && (<FormHelperText>{helperText}</FormHelperText>)}
    </FormControl>
  );
};

SelectComponent.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.array
};

SelectComponent.defaultProps = {
  items: [],
  fullWidth: false,
  size: 'medium'
};
