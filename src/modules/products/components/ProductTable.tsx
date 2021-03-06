import React, { memo } from 'react'
import { Checkbox } from '@mui/material';
import { useStyles } from '../../../styles/makeStyles'
import {
  EditProps,
  FilterProps,
  DeleteProps,
  ProductsProps
} from '../../../models/products';
import ProductTableRow from './ProductTableRow';
import { ArrowDownwardIcon, ArrowUpwardIcon } from '../../common/components/Icons';
interface Props {
  products: ProductsProps[],
  productsDeleted: DeleteProps[],
  isDeletingAll: boolean,
  filters: FilterProps,
  onChangeFilter(filters: FilterProps): void,
  handleAddProductEdited(changed: boolean, id: string, price: string, stock: string): void,
  handleAddDeleteProduct(id: string, isDeleting: boolean): void,
  openDialog(params: EditProps[]): void
}

const ProductTable = React.forwardRef<HTMLTableElement, Props>((props: Props, ref) => {
  const classes = useStyles();
  const {
    products,
    productsDeleted,
    isDeletingAll,
    filters,
    onChangeFilter,
    handleAddProductEdited,
    handleAddDeleteProduct,
    openDialog
  } = props;

  const onSorting = (type: string) => {
    if (filters.order_by === 'ASC') {
      onChangeFilter({
        ...filters,
        sort: type,
        order_by: 'DESC'
      })
      return;
    }

    onChangeFilter({
      ...filters,
      sort: type,
      order_by: 'ASC'
    })
  }

  const renderArrowIndication = () => {
    if (filters.order_by === 'ASC') {
      return <ArrowDownwardIcon sx={{
        width: '0.6em',
        height: '0.6em',
        marginLeft: '5px'
      }} />
    }

    return <ArrowUpwardIcon sx={{
      width: '0.6em',
      height: '0.6em',
      marginLeft: '5px'
    }} />
  }

  return (
    <div ref={ref} className={classes.mainTable} id='product-table'>
      <table  >
        <thead>
          <tr>
            <th>
              <Checkbox
                sx={{ color: '#fff' }}
                checked={
                  isDeletingAll
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    // nếu check thì check hêt các row
                    for (let i = 0; i < products.length; i++) {
                      handleAddDeleteProduct(products[i].id, true)
                    }
                    return;
                  }
                  // nếu không check thì uncheck hêt các row
                  for (let i = 0; i < products.length; i++) {
                    handleAddDeleteProduct(products[i].id, false)
                  }
                }}
              />
            </th>
            <th
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                onSorting('sku')
              }}
            >
              SKU
              {
                filters.sort === 'sku' && renderArrowIndication()
              }
            </th>
            <th
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                onSorting('name')
              }}
            >
              Name
              {
                filters.sort === 'name' && renderArrowIndication()
              }
            </th>
            <th >
              Category
            </th>
            <th
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                onSorting('price')
              }}
            >
              Price
              {
                filters.sort === 'price' && renderArrowIndication()
              }
            </th>
            <th
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                onSorting('amount')
              }}>
              In stock
              {
                filters.sort === 'amount' && renderArrowIndication()
              }
            </th>
            <th
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                onSorting('vendor')
              }}
            >
              Vendor
              {
                filters.sort === 'vendor' && renderArrowIndication()
              }
            </th>
            <th
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                onSorting('arrivalDate')
              }}
            >
              Arrival Date
              {
                filters.sort === 'arrivalDate' && renderArrowIndication()
              }
            </th>
          </tr>
        </thead>
        <tbody>
          {products && products.map(product => (
            <ProductTableRow
              key={product.id}
              product={product}
              isDeleting={
                productsDeleted.find(item => item.id === product.id)
                  ? true
                  : false
              }
              handleAddProductEdited={handleAddProductEdited}
              handleAddDeleteProduct={handleAddDeleteProduct}
              openDialog={openDialog}
            />
          ))}
        </tbody>
      </table>
    </div >
  )
})

ProductTable.displayName = 'ProductTable';

export default memo(ProductTable)