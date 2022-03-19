import React, { useState, memo } from 'react'
import { useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grid
} from '@mui/material';
import { FilterProps } from '../../../models/products';
import { AppState } from '../../../redux/reducer';
import { useStyles } from '../../../styles/makeStyles';
import ControlNormalInput from '../../common/components/ControlNormalInput';
import ControlSelectInput from '../../common/components/ControlSelectInput';
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '../../common/components/Icons';
import ControlAsyncAutocompleteInput from '../../common/components/ControlAsyncAutocompleteInput';

interface Props {
  filters: FilterProps,
  onChangeFilter(filters: FilterProps): void
}

const ProductFilterForm = (props: Props) => {
  const classes = useStyles();
  const { filters, onChangeFilter } = props;
  const categoriesState = useSelector((state: AppState) => state.common.categories)
  const [openMoreFilter, setOpenMoreFilter] = useState(false);

  const methods = useForm({
    defaultValues: {
      category: filters.category,
      search: filters.search,
      search_type: filters.search_type,
      stock_status: filters.stock_status,
      vendor: {
        value: filters.vendor.value,
        id: filters.vendor.id
      },
      availability: filters.availability,
      count: filters.count,
      order_by: filters.order_by,
      page: filters.page,
      sort: filters.sort
    }
  });

  const onSubmit = (data: FilterProps) => {
    onChangeFilter(data)
  }

  const toggleFilter = () => {
    setOpenMoreFilter((prev) => !prev)
  }

  const handleCheckboxChange = (checked: boolean, values: string) => {
    let newArr: string[] = []
    // split giá trị của search_type  thành mảng
    if (!methods.getValues('search_type')) {
      newArr = []
    } else {
      newArr = [...methods.getValues('search_type').split(',')]
    }

    // nếu đã checked và không có trong search_type thì cộng vào 
    if (checked && !newArr.includes(values)) {
      newArr.push(values)
    }

    // nếu bỏ checked và có trong search_type thì bỏ đi 
    if (!checked && newArr.includes(values)) {
      newArr = newArr.filter(item => item !== values)
    }

    methods.setValue('search_type', newArr.join(','))
  }

  return (
    <FormProvider {...methods}>
      <form className="filter-form" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="filter-box">
          {/* First row filter */}
          <div className="filter-options">
            <Grid item md={5}>
              <ControlNormalInput
                label=''
                name='search'
                required={{
                  value: false,
                  message: ''
                }}
                placeHolder='Type to search keyword'
                inputSize={12}
                labelSize={0}
              />
            </Grid>
            <Grid item md={3}>
              <ControlSelectInput
                label=''
                name='category'
                required={{
                  value: false,
                  message: ''
                }}
                inputSize={12}
                labelSize={0}
                defaultValue={'0'}
                data={categoriesState
                  ? [{ value: '0', name: 'Any category' }, ...categoriesState.map(item => ({ value: item.id, name: item.name }))]
                  : undefined}
              />
            </Grid>
            <Grid item md={3}>
              <ControlSelectInput
                label=''
                name='stock_status'
                required={{
                  value: false,
                  message: ''
                }}
                inputSize={12}
                labelSize={0}
                defaultValue={'all'}
                data={[
                  {
                    value: 'all',
                    name: 'Any stock status'
                  },
                  {
                    value: 'in',
                    name: 'In stock'
                  },
                  {
                    value: 'low',
                    name: 'Low stock'
                  },
                  {
                    value: 'out',
                    name: 'SOLD'
                  },

                ]}
              />
            </Grid>
            <div
              className={classes.mainButton}
              style={{
                marginBottom: '1.5rem'
              }}
            >
              <Button
                type="submit"
              >Search
              </Button>
            </div>
          </div>

          {/* toggle button */}
          <div className="toggle-btn" onClick={toggleFilter}>
            {openMoreFilter
              ? <KeyboardArrowUpIcon />
              : <KeyboardArrowDownIcon />}
          </div>

          {/* Second row hidden*/}
          <div
            className="filter-options"
            style={{
              alignItems: 'flex-start',
              height: openMoreFilter ? '140px' : '0',
              opacity: openMoreFilter ? '1' : '0',
              pointerEvents: openMoreFilter ? 'auto' : 'none'
            }}>
            <div className="search-in">
              <div className="search-in-title">
                <Typography variant="subtitle1">
                  Search in:
                </Typography>
              </div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={methods.watch('search_type').includes('name')}
                      value="name"
                      onChange={(e) => handleCheckboxChange(e.target.checked, e.target.value)}
                    />}
                  label="Name"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={methods.watch('search_type').includes('sku')}
                      value="sku"
                      onChange={
                        (e) =>
                          handleCheckboxChange(e.target.checked, e.target.value)
                      } />}
                  label="SKU"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={methods.watch('search_type').includes('description')}
                      value="description"
                      onChange={
                        (e) =>
                          handleCheckboxChange(e.target.checked, e.target.value)
                      }
                    />}
                  label="Full Description"
                />
              </FormGroup>
            </div>
            <Grid item md={4} >
              <ControlSelectInput
                label='Availability'
                name='availability'
                required={{
                  value: false,
                  message: ''
                }}
                inputSize={7}
                labelSize={3}
                defaultValue={'all'}
                data={[
                  {
                    value: 'all',
                    name: 'Any availability status'
                  },
                  {
                    value: '1',
                    name: 'Only enabled'
                  },
                  {
                    value: '0',
                    name: 'Only Disabled'
                  },
                ]}
              />
            </Grid>
            <Grid item md={4}>
              <ControlAsyncAutocompleteInput
                label="Vendor"
                name='vendor'
                required={false}
                labelSize={2}
                inputSize={8}
              />
            </Grid>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default memo(ProductFilterForm)