import React, { useEffect } from 'react'
import { MenuItem, Pagination, Select, Stack } from '@mui/material'
import { useStyles } from '../../../../styles/makeStyles'
import { FilterProps } from '../../../../models/products'

interface Props {
  totalLengthProducts: number,
  numberProductsPerPage: number,
  onChangeFilter(filters: any): void,
  filters: any
}

const optionsLengthPerPage = [
  '10',
  '25',
  '50',
  '75',
  '100'
]

const TablePagination = (props: Props) => {
  const classes = useStyles();

  return (
    <Stack spacing={2} sx={{
      borderTop: '1px solid #000',
      backgroundColor: '#323259',
      color: '#fff',
      padding: '20px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: '30px'
    }}>
      <Pagination
        onChange={(e, value) =>
          props.onChangeFilter({
            ...props.filters,
            page: value
          })
        }
        className={classes.pagination}
        variant="outlined"
        shape="rounded"
        count={Math.ceil(props.totalLengthProducts / props.numberProductsPerPage)}
        sx={{
          color: '#fff'
        }} />
      <div style={{
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        columnGap: "5px"
      }}>
        <div>
          <span style={{
            marginRight: '2px',
            fontWeight: "700"
          }}>{props.totalLengthProducts}</span>
          <span>items</span>
        </div>
        <div>
          <select
            onChange={(e) => {
              if (+e.target.value !== props.filters.count) {
                props.onChangeFilter({
                  ...props.filters,
                  count: +e.target.value,
                  page: 1
                })
              }
            }
            }
            style={{
              width: '70px',
              margin: '0 10px',
              outline: 'none',
              padding: '3px 10px',
              color: '#fff',
              backgroundColor: '#b18aff',
              borderColor: "transparent",
              fontSize: '15px',
              borderRadius: '3px'
            }}
            name="count"
            id="count"
          >
            {optionsLengthPerPage.map((options) => (
              <option
                selected={props.numberProductsPerPage === +options}
                key={options}
                value={options}>
                {options}
              </option>
            ))}
          </select>
        </div>
        <span>
          per page
        </span>
      </div>
    </Stack >
  )
}

export default TablePagination