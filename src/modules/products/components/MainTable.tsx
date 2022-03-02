import React from 'react'
import { Button, Checkbox } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useStyles } from '../../../styles/makeStyles'
import { FilterProps, ProductsProps } from '../../../models/products';
import MainTableRow from './MainTableRow';
import { filter } from 'lodash';

interface Props {
  products: ProductsProps[],
  onChangeFilter(filters: FilterProps): void,
  filters: FilterProps
}

const MainTable = (props: Props) => {
  const classes = useStyles();
  const { products, onChangeFilter, filters } = props;

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
    <div className={classes.mainTable} >
      <table>
        <thead>
          <tr>
            <th>
              <Button>
                <Checkbox sx={{ color: '#fff' }} />
              </Button>
            </th>
            <th >
              SKU
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
            <th >
              In stock
            </th>
            <th >
              Vendor
            </th>
            <th >
              Arrival Date
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <MainTableRow key={product.id} {...product} />
          ))}
        </tbody>
      </table>
    </div >
  )
}

export default MainTable