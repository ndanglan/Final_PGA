import React from 'react'
import { makeStyles } from '@mui/styles'
import { Pagination, Stack } from '@mui/material'
import { WHITE_COLOR } from '../../../../configs/colors'

interface Props {
  totalLengthProducts: number,
  numberProductsPerPage: number,
  onChangeFilter(filters: any): void,
  filters: any,
  optionsLengthPerPage: string[]
}

const useStyles = makeStyles(({
  pagination: {
    '& li button': {
      color: WHITE_COLOR,

      '&.Mui-selected': {
        backgroundColor: '#b18aff',
        color: WHITE_COLOR,
        borderColor: 'transparent'
      }
    }
  },
}))

const CustomPagination = (props: Props) => {
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
        page={props.filters.page}
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
            {props.optionsLengthPerPage.map((options) => (
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

export default CustomPagination