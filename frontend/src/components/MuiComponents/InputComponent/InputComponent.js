// base
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import TextField from '@material-ui/core/TextField'

export const InputComponent = (props) => {
  const { label, name, ...restProps } = props

  return (
    <TextField
      fullWidth
      variant="outlined"
      name={name}
      inputProps={{
        name
      }}
      label={label}
      {...restProps}
    />
  )
}

InputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}
