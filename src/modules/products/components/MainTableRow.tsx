import React, {
  memo,
  useState,
  useRef,
  useEffect
} from 'react'
import { useStyles } from '../../../styles/makeStyles'
import { Button, Checkbox } from '@mui/material'
import {
  DeleteIcon,
  PowerSettingsNewIcon
} from '../../common/components/Icons';
import {
  EditProps,
  ProductsProps
} from '../../../models/products';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NumberFormat from "react-number-format";
import { ROUTES } from '../../../configs/routes';
import { WHITE_COLOR } from '../../../configs/colors';

interface Props {
  product: ProductsProps,
  handleAddProductEdited(changed: boolean, id: string, price: string, stock: string): void,
  handleAddDeleteProduct(id: string, isDeleting: boolean): void,
  openDialog(params: EditProps[]): void
}

const MainTableRow = (props: Props) => {
  const {
    product,
    handleAddProductEdited,
    handleAddDeleteProduct,
    openDialog
  } = props;
  const classes = useStyles();

  const [stockState, setStockState] = useState({
    isEditing: false,
    value: product.amount
  })

  const [priceState, setPriceState] = useState({
    isEditing: false,
    value: product.price
  })

  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (+priceState.value === +product.price
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
    handleAddDeleteProduct(product.id, isDeleting)
  }, [isDeleting])

  return (
    <tr style={{
      opacity: isDeleting ? '0.3' : '1'
    }}>
      <td>
        <div className="cell">
          <div className="action">
            <Checkbox sx={{ color: '#fff' }} />
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
            <Link to={`${ROUTES.productDetail}/${product.id}`}>
              {product.name}
            </Link>
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
                onValueChange={(e) =>
                  setPriceState((prev) => {
                    if (e.formattedValue === '') {
                      return {
                        ...prev,
                        value: '0'
                      }
                    }
                    return {
                      ...prev,
                      value: e.value
                    }
                  })
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
                setIsDeleting((prev) => !prev);
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