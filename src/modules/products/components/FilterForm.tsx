import React, { useState, memo, useCallback } from 'react'
import { FormControl, MenuItem, Select, Typography, FormGroup, FormControlLabel, Checkbox, Button, CircularProgress } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FilterProps, FetchVendorsProps } from '../../../models/products';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { debounce } from 'lodash';
import { WHITE_COLOR } from '../../../configs/colors';
import { useStyles } from '../../../styles/makeStyles';
import { useSelector } from 'react-redux';

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

  const [formValues, setFormValues] = useState({
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
  });

  const [vendorLoading, setVendorLoading] = useState(false);
  const [dropdownVendorList, setDropdownVendorList] = useState<FetchVendorsProps[] | []>([])

  const toggleFilter = () => {
    setOpenMoreFilter((prev) => !prev)
  }

  const handleCheckboxChange = (checked: boolean, values: string) => {
    let newArr: string[] = []
    // plit giá trị của search_type  thành mảng
    if (!filters.search_type) {
      newArr = []
    } else {
      newArr = [...filters.search_type.split(',')]
    }

    // nếu đã checked và không có trong search_type thì cộng vào 
    if (checked && !newArr.includes(values)) {
      newArr.push(values)
    }

    // nếu bỏ checked và có trong search_type thì bỏ đi 
    if (!checked && newArr.includes(values)) {
      newArr = newArr.filter(item => item !== values)
    }

    // add vào filter với kiểu là mảng và cách nhau bằng dấu ,
    setFormValues((prev) => {
      if (prev) {
        return {
          ...prev,
          search_type: newArr.join(',')
        }
      }

      return prev
    })
  }

  const fetchVendorsBySearch = useCallback(async (searchValue: { search: string }) => {
    setVendorLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.getVendors, 'post', searchValue));

    setVendorLoading(false);
    // console.log(json);

    if (json?.success) {
      setDropdownVendorList(json.data)
    }
  }, [dispatch]);

  const debounceFetch = useCallback(
    debounce((nextValue: { search: string }) => {
      // console.log('test');

      fetchVendorsBySearch(nextValue)
    }, 500)
    , [])

  return (
    <form className="filter-form">
      <div className="filter-box">
        {/* First row filter */}
        <div className="filter-options">
          <FormControl
            className={classes.filterFormControl}
            style={{
              width: '50%'
            }}
          >
            <input
              value={formValues.search}
              type="text"
              placeholder="Search keyword"
              onChange={
                (e) => setFormValues((prev) => ({
                  ...prev,
                  search: e.target.value
                }))
              }
            />
          </FormControl>
          <FormControl
            style={{
              width: '25%'
            }}
            className={classes.filterFormControl}
          >
            <Select
              onChange={
                (e) => setFormValues((prev) => ({
                  ...prev,
                  category: e.target.value
                }))
              }
              value={formValues.category}
              displayEmpty
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: '20rem',
                    width: '270px',
                    backgroundColor: '#323259',
                    color: '#fff',
                  }
                }
              }}
              sx={{
                color: '#fff',
                border: '1px solid #000'
              }}

            >
              <MenuItem
                value="0"
                key="any category"
              >
                Any Category
              </MenuItem>
              {categoriesState && (
                categoriesState.map(category => (
                  <MenuItem
                    key={category.id}
                    value={category.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(180,180,219,0.16)'
                      }
                    }}
                  >
                    {category.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <FormControl
            style={{
              width: '25%'
            }}
            className={classes.filterFormControl}
          >
            <Select
              onChange={
                (e) => setFormValues((prev) => ({
                  ...prev,
                  stock_status: e.target.value
                }))
              }
              value={formValues.stock_status}
              displayEmpty
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: '20rem',
                    width: '270px',
                    backgroundColor: '#323259',
                    color: '#fff',
                  }
                }
              }}
              sx={{
                color: '#fff',
                border: '1px solid #000'
              }}

            >
              <MenuItem
                value="all"
                key="any category"
              >
                Any stock status
              </MenuItem>
              <MenuItem
                key={1}
                value={'in'}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(180,180,219,0.16)'
                  }
                }}
              >
                In stock
              </MenuItem>
              <MenuItem
                key={1}
                value={'low'}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(180,180,219,0.16)'
                  }
                }}
              >
                Low stock
              </MenuItem>
              <MenuItem
                key={1}
                value={'out'}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(180,180,219,0.16)'
                  }
                }}
              >
                SOLD
              </MenuItem>
            </Select>
          </FormControl>
          <div className={classes.mainButton}>
            <Button
              type="submit"
              className={classes.mainButton}
              onClick={(e) => {
                e.preventDefault();
                onChangeFilter({
                  ...formValues,
                  // truyền vào obj thì truyền vào vendor là giá trị của id của vendor đã chọn
                  vendor: formValues.vendor.id
                });
              }}
            >Search
            </Button>
          </div>
        </div>

        {/* toggle button */}
        <div className="toggle-btn" onClick={toggleFilter}>
          {openMoreFilter ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
                control={<Checkbox value="name" onChange={(e) => handleCheckboxChange(e.target.checked, e.target.value)} />}
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
          <div style={{
            paddingTop: '8px',
            display: 'flex',
            alignItems: 'center',
            columnGap: '10px'
          }}>
            <div>
              <Typography variant="subtitle1">
                Availability
              </Typography>
            </div>
            <FormControl
              className={classes.filterFormControl}
            >
              <Select
                onChange={
                  (e) => setFormValues((prev) => ({
                    ...prev,
                    availability: e.target.value
                  }))
                }
                value={formValues.availability}
                displayEmpty
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: '20rem',
                      width: '270px',
                      backgroundColor: '#323259',
                      color: '#fff',
                    }
                  }
                }}
                sx={{
                  color: '#fff',
                  border: '1px solid #000'
                }}

              >
                <MenuItem
                  value="all"
                  key="Any availability status"
                >
                  Any availability status
                </MenuItem>
                <MenuItem
                  key={1}
                  value={'E'}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(180,180,219,0.16)'
                    }
                  }}
                >
                  Only enabled
                </MenuItem>
                <MenuItem
                  key={1}
                  value={'D'}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(180,180,219,0.16)'
                    }
                  }}
                >
                  OnlyDisabled
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{
            paddingTop: '8px',
            display: 'flex',
            alignItems: 'center',
            columnGap: '10px'
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
                value={formValues.vendor.value}
                type="text"
                placeholder="Search vendor"
                onChange={
                  (e) => {
                    setFormValues((prev) => ({
                      ...prev,
                      vendor: {
                        ...prev.vendor,
                        value: e.target.value
                      }
                    }))

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
                          setFormValues(prev => ({
                            ...prev,
                            vendor: {
                              value: item.companyName,
                              id: item.id
                            }
                          }))
                          setDropdownVendorList([])
                        }
                        }
                      >
                        <div>
                          <span>{item.companyName}</span>
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
  )
}

export default memo(FilterForm)