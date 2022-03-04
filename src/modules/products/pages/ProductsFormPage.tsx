import React from 'react'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useStyles } from '../../../styles/makeStyles'
import { DARK_BLUE, WHITE_COLOR } from '../../../configs/colors';
import InfoProductForm from '../components/InfoProductForm';
import UtilComponent from '../../common/components/Layout/UtilComponent';

interface Props { }

const ProductsFormPage = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.mainPage} >
      <div style={{
        // overflow: 'auto',
        height: 'auto',
      }}>
        <div style={{
          marginBottom: '30px'
        }}>
          <div>
            <button
              style={{
                color: DARK_BLUE,
                backgroundColor: WHITE_COLOR,
                width: '32px !important',
                minWidth: '32px',
                height: '32px',
                borderRadius: '50%',
                outline: 'none',
                border: `1px solid ${WHITE_COLOR}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: "center"
              }}>
              <ArrowBackIcon sx={{
                width: '20px',
                height: '20px'
              }} />
            </button>
          </div>
        </div>
        <div>
          <InfoProductForm title="Add Product" />
        </div>
      </div>
      <UtilComponent>
        <div >
          <Button
            sx={{
              backgroundColor: "#f0ad4e",
              color: '#fff'
            }}
          >
            Add Product
          </Button>
        </div>
      </UtilComponent >
    </div>
  )
}

export default ProductsFormPage