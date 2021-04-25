import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MonthlyScheduler } from 'components'

const useStyles = makeStyles({
  root: {
    padding: '1.6rem 0 0'
  }
})

export const Calendar = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <MonthlyScheduler/>
    </div>
  )
}
