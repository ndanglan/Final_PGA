import React, { useCallback, useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { FetchCategoryProps, CategoryProps, ProductsProps, FilterProps } from '../../../models/products';
import { AppState } from '../../../redux/reducer';
import { useStyles } from '../../../styles/makeStyles'
import TablePagination from '../../common/components/Layout/TablePagination';
import { setLoading } from '../../common/redux/loadingReducer';
import { fetchThunk } from '../../common/redux/thunk';
import FilterForm from '../components/FilterForm';
import { setCategories } from '../redux/productsReducers';
import UtilComponent from '../../common/components/Layout/UtilComponent';
import MainTable from '../components/MainTable';

const ProductsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [categoriesState, setCategoriesState] = useState<CategoryProps[]>([]);

  const [productsState, setProductsState] = useState<{
    productsState: ProductsProps[],
    numberProducts: number
  }>();

  const [filters, setFilters] = React.useState<FilterProps>({
    category: "0",
    count: 25,
    order_by: "ASC",
    page: 1,
    search: "",
    search_type: "",
    sort: "name",
    stock_status: "all",
    vendor: "",
    availability: 'all'
  });

  // add filter values to filter state
  const handleChangeFilter = useCallback(async (filters: FilterProps) => {
    setFilters(filters);
  }, []);

  // call api for category selection
  const fetchCategory = useCallback(async () => {

    const json = await dispatch(fetchThunk(API_PATHS.getCategory));

    if (json.success) {

      const newArr: CategoryProps[] = json?.data.map((item: FetchCategoryProps) => ({ id: item.id, name: item.name }))

      if (newArr.length > 0) {
        setCategoriesState(newArr);
        dispatch(setCategories(newArr));
      }
      return;
    }

  }, [dispatch]);

  // call api products with filtering
  const fetchProduct = useCallback(async (filters: FilterProps) => {
    dispatch(setLoading(true));

    const json = await dispatch(fetchThunk(API_PATHS.getProductFiltering, 'post', filters));

    dispatch(setLoading(false));

    if (json.success) {
      setProductsState({
        productsState: json.data,
        numberProducts: json.recordsTotal
      });
    }
    return;
  }, [dispatch]);

  useEffect(() => {
    // fetch Category
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    fetchProduct(filters)
  }, [filters, fetchProduct])

  return (
    <>
      <div className={classes.mainPage}>
        <div style={{
          overflow: 'auto',
          height: 'auto',
        }}>
          <div>
            <Typography
              className="title"
              component="h2"
              variant="h2">
              Products
            </Typography>
          </div>
          <FilterForm
            categoriesState={categoriesState}
            filters={filters}
            onChangeFilter={handleChangeFilter}
          />
          {productsState && (
            <>
              <div>
                {/* Add product Button */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start'
                }}>
                  <div className={classes.mainButton}>
                    <Button>
                      Add Products
                    </Button>
                  </div>
                </div>

                {/* Table */}
                <MainTable
                  onChangeFilter={handleChangeFilter}
                  products={productsState.productsState}
                  filters={filters}
                />
              </div>
              <TablePagination
                filters={filters}
                onChangeFilter={handleChangeFilter}
                totalLengthProducts={+productsState.numberProducts}
                numberProductsPerPage={+filters.count}
              />
            </>
          )}
        </div>
        <UtilComponent>
          <div >
            <Button sx={{
              backgroundColor: "#f0ad4e",
              color: '#fff'
            }}>
              Save changes
            </Button>
          </div>
          <div >
            <Button sx={{
              backgroundColor: "#f0ad4e",
              color: '#fff'
            }}>
              Export all: CSV
            </Button>
          </div>
        </UtilComponent>
      </div>
    </>
  )
}

export default ProductsPage