import React from 'react'
import { Button, Checkbox } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useStyles } from '../../../styles/makeStyles'
import { EditProps, FilterProps, ProductsProps, DeleteProps } from '../../../models/products';
import MainTableRow from './MainTableRow';
interface Props {
  products: ProductsProps[],
  productsDeleted: DeleteProps[],
  filters: FilterProps,
  onChangeFilter(filters: FilterProps): void,
  handleAddProductEdited(changed: boolean, id: string, price: string, stock: string): void,
  handleAddDeleteProduct(id: string, isDeleting: boolean): void,
  openDialog(params: EditProps[]): void
}

const MainTable = React.forwardRef<HTMLTableElement, Props>((props: Props, ref) => {
  const classes = useStyles();
  const {
    products,
    productsDeleted,
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
                  productsDeleted.length
                  === products.length
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
          {products.map(product => (
            <MainTableRow
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

MainTable.displayName = 'MainTable';

export default MainTable