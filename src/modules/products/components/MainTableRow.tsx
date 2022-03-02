import React, { memo, useState, useRef, useEffect } from 'react'
import { useStyles } from '../../../styles/makeStyles'
import { Button, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { ProductsProps } from '../../../models/products';
import moment from 'moment';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const MainTableRow = (props: ProductsProps) => {
  const classes = useStyles();
  const [editState, setEditState] = useState({
    price: false,
    stock: false,
  });
  const priceInputRef = useRef<HTMLInputElement>(null);
  const stockInputRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  useEffect(() => {

    if (editState.price && priceInputRef.current !== null) {
      priceInputRef.current?.focus();
    }

    if (editState.stock && stockInputRef.current !== null) {
      stockInputRef.current?.focus();
    }

  }, [editState.price, editState.stock])

  return (
    <tr>
      <td>
        <div className="cell">
          <div className="action">
            <Checkbox sx={{ color: '#fff' }} />
          </div>
          <div className="action action-next">
            <PowerSettingsNewIcon />
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <span>
              {props.sku}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="cell big-cell">
          <div>
            <Link to="/">
              {props.name}
            </Link>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <span>
              {props.category}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          {!editState.price ? (
            <div
              className="editable"
              onClick={() => {
                setEditState((prev) => ({
                  ...prev,
                  price: true
                }))
              }}
            >
              <span>
                $
                {intl.formatNumber(
                  parseFloat(props.price),
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </span>
            </div>

          ) : (
            <div
              className='input-group-edit'
              onBlur={() => setEditState(prev => ({
                ...prev,
                price: false
              }))}
            >
              <span>$</span>
              <input ref={priceInputRef} type="text" value={props.price} />
            </div>
          )}
        </div>
      </td>
      <td>
        <div className="cell">
          {!editState.stock ? (
            <div
              className="editable"
              onClick={() => {
                setEditState((prev) => ({
                  ...prev,
                  stock: true
                }))
              }}
            >
              <span>
                {props.amount}
              </span>
            </div>

          ) : (
            <div
              className='input-group-edit'
              onBlur={() => setEditState(prev => ({
                ...prev,
                stock: false
              }))}
            >
              <span>$</span>
              <input ref={stockInputRef} type="text" value={props.amount} />
            </div>
          )}
        </div>
      </td>
      <td>
        <div className="cell small-cell">
          <div>
            <Link to="/">
              {props.vendor}
            </Link>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <span>
              {moment.unix(+props.arrivalDate).format('MMM DD,YYYY')}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div className={classes.mainButton}>
            <Button>
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default memo(MainTableRow)