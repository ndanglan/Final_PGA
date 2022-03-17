import React from 'react'
import { CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    zIndex: '2000',
    color: '#fff'
  }
}))

const SpinnerLoading = () => {
  const classes = useStyles()
  return (
    <div className={classes.backdrop}>
      <CircularProgress color="inherit" />
    </div>
  )
}

export default SpinnerLoading