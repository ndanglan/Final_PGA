import React, { memo } from 'react'
import { makeStyles } from '@mui/styles'

interface Props {
  children: JSX.Element[] | JSX.Element
}

const useStyles = makeStyles(({
  utilsContainer: {
    position: 'sticky',
    postion: '-webkit-sticky',
    bottom: '0',
    width: '100%',
    padding: '18px 36px',
    backgroundColor: '#323259',
    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.8)",
    marginTop: '40px',
    zIndex: '1000',
    overflowX: 'hidden',

    '& .MuiButton-root:hover': {
      backgroundColor: '#f0ad4e',
      borderColor: 'transparent',
      color: '#191836'
    }
  },
}))

const UtilComponent = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.utilsContainer}>
      <div >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '20px'
        }}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default memo(UtilComponent)