import React, {
  memo,
  useState,
  useEffect
} from 'react'
import { Button, Checkbox } from '@mui/material'
import moment from 'moment';
import NumberFormat from "react-number-format";
import { Link } from 'react-router-dom';
import { useStyles } from '../../../styles/makeStyles'
import {
  DeleteIcon,
  PowerSettingsNewIcon
} from '../../common/components/Icons';
import {
  EditProps,
  ProductsProps
} from '../../../models/products';
import { ROUTES } from '../../../configs/routes';
import { WHITE_COLOR } from '../../../configs/colors';

interface Props {
  product: ProductsProps,
  isDeleting: boolean,
  handleAddProductEdited(changed: boolean, id: string, price: string, stock: string): void,
  handleAddDeleteProduct(id: string, isDeleting: boolean): void,
  openDialog(params: EditProps[]): void
}

const MainTableRow = (props: Props) => {
  const {
    product,
    handleAddProductEdited,
    handleAddDeleteProduct,
    openDialog,
    isDeleting
  } = props;
  const classes = useStyles();

  const [stockState, setStockState] = useState({
    isEditing: false,
    value: ''
  })

  const [priceState, setPriceState] = useState({
    isEditing: false,
    value: ''
  })

  useEffect(() => {
    // check neu product da edited inline hay chua neu chua thi disable button con neu co thi enable button
    if (
      +priceState.value === +product.price
      && +stockState.value === +product.amount
    ) {
      handleAddProductEdited(
        false,
        product.id,
        priceState.value,
        stockState.value
      );
      return;
    }

    handleAddProductEdited(
      true,
      product.id,
      priceState.value,
      stockState.value
    );

  }, [priceState.value, stockState.value])

  useEffect(() => {
    setStockState({
      isEditing: false,
      value: product.amount
    });

    setPriceState({
      isEditing: false,
      value: product.price
    })
  }, [product.amount, product.price])

  return (
    <tr style={{
      opacity: isDeleting ? '0.3' : '1'
    }}>
      <td>
        <div className="cell">
          <div className="action">
            <Checkbox
              sx={{ color: '#fff' }}
              checked={isDeleting}
              onChange={() => {
                handleAddDeleteProduct(product.id, !isDeleting)
              }}
            />
          </div>
          <div className="action action-next">
            <PowerSettingsNewIcon
              sx={{
                color: product.enabled === '1' ? '#72b25b' : WHITE_COLOR
              }}
              onClick={() => {
                openDialog([{
                  id: product.id,
                  enable: product.enabled === '1' ? 0 : 1
                }])
              }}
            />
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <span>
              {product.sku}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="cell big-cell">
          <div>
            {product.name !== null && (
              <Link to={`${ROUTES.productDetail}/${product.id}`}>
                {product.name}
              </Link>
            )}
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <span>
              {product.category}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          {!priceState.isEditing ? (
            <div
              className="editable"
              onClick={() => {
                setPriceState((prev) => ({
                  ...prev,
                  isEditing: true
                }))
              }}
            >
              <NumberFormat
                displayType="text"
                prefix="$"
                autoFocus={true}
                decimalSeparator="."
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                value={
                  priceState.value
                }
              />
            </div>

          ) : (
            <div
              className='input-group-edit'
              onBlur={() => setPriceState(prev => ({
                ...prev,
                isEditing: false
              }))}
            >
              <span>$</span>
              <NumberFormat
                displayType="input"
                defaultValue=""
                autoFocus={true}
                decimalSeparator="."
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                value={
                  priceState.value
                }
                onValueChange={(e) => {
                  setPriceState((prev) => {
                    if (e.formattedValue === '') {
                      return {
                        ...prev,
                        value: ''
                      }
                    }
                    return {
                      ...prev,
                      value: e.value
                    }
                  })
                }

                }
              />
            </div>
          )}
        </div>
      </td>
      <td>
        <div className="cell">
          {!stockState.isEditing ? (
            <div
              className="editable"
              onClick={() => {
                setStockState((prev) => ({
                  ...prev,
                  isEditing: true
                }))
              }}
            >
              <span>
                {stockState.value}
              </span>
            </div>

          ) : (
            <div
              className='input-group-edit'
              onBlur={() => setStockState(prev => ({
                ...prev,
                isEditing: false
              }))}
            >
              <NumberFormat
                thousandsGroupStyle="thousand"
                displayType="input"
                type="text"
                defaultValue=""
                autoFocus={true}
                thousandSeparator={true}
                value={
                  stockState.value
                }
                onValueChange={(e) => {
                  setStockState((prev) => {
                    if (e.formattedValue === '') {
                      return {
                        ...prev,
                        value: '0'
                      }
                    }
                    return {
                      ...prev,
                      value: e.formattedValue
                    }
                  })
                }}
              />
            </div>
          )}
        </div>
      </td>
      <td>
        <div className="cell small-cell">
          <div>
            <Link to="/">
              {product.vendor}
            </Link>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <span>
              {moment.unix(+product.arrivalDate).format('MMM DD,YYYY')}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div className={classes.mainButton}>
            <Button
              onClick={() => {
                handleAddDeleteProduct(product.id, !isDeleting)
              }}>
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default memo(MainTableRow)