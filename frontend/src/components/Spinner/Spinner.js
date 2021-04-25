// base
import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
  background: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100vh',
    width: '100vw',
    background: 'rgb(255 255 255 / 30%);',
    zIndex: 99998
  },
  progress: {
    position: 'fixed',
    zIndex: 99999,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto'
  }
})

export const Spinner = () => {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.background}/>
      <CircularProgress className={classes.progress}/>
    </div>
  )
}
