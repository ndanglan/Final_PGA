import React, { useState, memo, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSelector } from 'react-redux';
import { Action } from 'typesafe-actions';
import { debounce } from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FormControl,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
  Grid
} from '@mui/material';
import { FilterProps, FetchVendorsProps } from '../../../models/products';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { WHITE_COLOR } from '../../../configs/colors';
import { useStyles } from '../../../styles/makeStyles';
import ControlNormalInput from '../../common/components/ControlNormalInput';
import ControlSelectInput from '../../common/components/ControlSelectInput';
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '../../common/components/Icons';

interface Props {
  filters: FilterProps,
  onChangeFilter(filters: FilterProps): void
}

const FilterForm = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { filters, onChangeFilter } = props;
  const categoriesState = useSelector((state: AppState) => state.categories.categories)
  const [openMoreFilter, setOpenMoreFilter] = useState(false);

  const methods = useForm({
    defaultValues: {
      category: filters.category,
      search: filters.search,
      search_type: filters.search_type,
      stock_status: filters.stock_status,
      vendor: {
        value: '',
        id: filters.vendor
      },
      availability: filters.availability,
      count: filters.count,
      order_by: filters.order_by,
      page: filters.page,
      sort: filters.sort
    }
  });

  const onSubmit = (data: {
    category: string;
    search: string;
    search_type: string;
    stock_status: string;
    vendor: {
      value: string;
      id: string;
    };
    availability: string;
    count: number;
    order_by: string;
    page: number;
    sort: string;
  }) => {
    const formatedData = {
      ...data,
      vendor: data.vendor.id
    }

    onChangeFilter(formatedData)
  }

  const [vendorLoading, setVendorLoading] = useState(false);
  const [dropdownVendorList, setDropdownVendorList] = useState<FetchVendorsProps[] | []>([])

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

  const fetchVendorsBySearch = useCallback(async (searchValue: { search: string }) => {
    setVendorLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.getVendors, 'post', searchValue));

    setVendorLoading(false);

    if (json?.success) {
      setDropdownVendorList(json.data)
    }
  }, [dispatch]);

  const debounceFetch = useCallback(
    debounce((nextValue: { search: string }) => {

      fetchVendorsBySearch(nextValue)
    }, 500)
    , [])

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
                      value="name"
                      onChange={(e) => handleCheckboxChange(e.target.checked, e.target.value)}
                    />}
                  label="Name"
                />
                <FormControlLabel
                  control={
                    <Checkbox
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '10px',
              marginBottom: '1.5rem'
            }}>
              <div>
                <Typography variant="subtitle1">
                  Vendor
                </Typography>
              </div>
              <FormControl
                className={classes.filterFormControl}
                sx={{
                  position: 'relative'
                }}
              >
                {/* giá trị của input chỉ để hiện thị lên màn hình và fetch vendor  */}
                <input
                  value={methods.getValues('vendor').value}
                  type="text"
                  placeholder="Search vendor"
                  onChange={
                    (e) => {
                      methods.setValue('vendor', {
                        ...methods.getValues('vendor'),
                        value: e.target.value
                      })

                      debounceFetch({ search: e.target.value })
                    }
                  }
                />
                {vendorLoading && (
                  <CircularProgress sx={{
                    position: 'absolute',
                    color: WHITE_COLOR,
                    right: '10px',
                    top: '10px',
                    transform: 'translateY(50%)',
                    width: '25px !important',
                    height: '25px !important'
                  }} />
                )}
                {dropdownVendorList.length > 0 && (
                  <div className={classes.dropdownVendorList}>
                    <ul>
                      {dropdownVendorList.map(item => (
                        <li
                          key={item.id}
                          // khi chọn 1 vendor vào ô vendor search thì sẽ xét cả id để gửi lên server
                          onClick={() => {
                            methods.setValue('vendor', {
                              value: item.companyName,
                              id: item.id
                            })

                            setDropdownVendorList([])
                          }
                          }
                        >
                          <div>
                            <span>{item.name}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </FormControl>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default memo(FilterForm)