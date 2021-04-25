import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  overrides: {
    MuiInputBase: {
      disabled: {},
      input: {
        '&$disabled': {
          cursor: 'not-allowed !important'
        },
      }
    },
    MuiButton: {
      disabled: {},
      root: {
        '&$disabled': {
          cursor: 'not-allowed !important'
        },
      }
    },
  },
});
