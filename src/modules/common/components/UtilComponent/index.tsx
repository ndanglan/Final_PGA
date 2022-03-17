import React from 'react'
import { useStyles } from '../../../../styles/makeStyles'

interface Props {
  children: JSX.Element[] | JSX.Element
}

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

export default UtilComponent