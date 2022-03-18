import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(({
  seperate: {
    display: 'block',
    height: '20px',
    background: '#323259',
    margin: '0 -2.25rem 0 -2.25rem',
    boxShadow: 'inset 0 5px 5px -5px rgba(0, 0, 0,0.75)'
  }
}))

const FormSeperateSpace = () => {
  const classes = useStyles();
  return (
    <div className={classes.seperate} />
  )
}

export default FormSeperateSpace