import React from 'react'
import { CircularProgress } from '@mui/material'

const SpinnerLoading = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: "center",
      alignItems: 'center',
      zIndex: '1000',
      color: '#fff'
    }}>
      <CircularProgress color="inherit" />
    </div>
  )
}

export default SpinnerLoading