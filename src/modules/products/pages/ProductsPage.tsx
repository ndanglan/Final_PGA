import React, { useCallback, useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { FetchCategoryProps, CategoryProps, ProductsProps, FilterProps, EditProps, DeleteProps } from '../../../models/products';
import { AppState } from '../../../redux/reducer';
import { useStyles } from '../../../styles/makeStyles'
import TablePagination from '../../common/components/Layout/TablePagination';
import { setLoading } from '../../common/redux/loadingReducer';
import { fetchThunk } from '../../common/redux/thunk';
import FilterForm from '../components/FilterForm';
import { setCategories } from '../redux/productsReducers';
import UtilComponent from '../../common/components/Layout/UtilComponent';
import MainTable from '../components/MainTable';
import ConfirmDialog, { DialogProps } from '../../common/components/ConfirmDialog';
import FileSaver from 'file-saver';

const ProductsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [categoriesState, setCategoriesState] = useState<CategoryProps[]>([]);

  const [productsState, setProductsState] = useState<{
    productsState: ProductsProps[] | [],
    numberProducts: number
  }>({
    productsState: [],
    numberProducts: 0
  });

  const [filters, setFilters] = React.useState<FilterProps>({
    category: "0",
    count: 25,
    order_by: "ASC",
    page: 1,
    search: "",
    search_type: "",
    sort: "name",
    stock_status: "all",
    vendor: '',
    availability: 'all'
  });

  const [productsEdited, setProductsEdited] = useState<EditProps[] | []>([]);

  const [productsDeleted, setProductsDeleted] = useState<DeleteProps[] | []>([]);

  const [dialogOptions, setDialogOptions] = useState<DialogProps>({
    open: false,
    title: '',
    content: '',
  });

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

    if (json.success && json.data) {
      setProductsState({
        productsState: json.data,
        numberProducts: json.recordsTotal
      });
      return;
    }

    setProductsState({
      productsState: [],
      numberProducts: 0
    });
    return;
  }, [dispatch]);

  // add filter values to filter state
  const handleChangeFilter = useCallback(async (filters: FilterProps) => {
    setFilters(filters);
  }, []);

  useEffect(() => {
    // fetch Category
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    fetchProduct(filters)
  }, [filters, fetchProduct])

  // call api edit product
  const editProduct = useCallback(async (
    params: EditProps[] | DeleteProps[]
  ) => {

    setDialogOptions({
      open: false,
      title: '',
      content: ''
    })

    dispatch(setLoading(true));

    const json = await dispatch(fetchThunk(API_PATHS.editProduct, 'post', {
      params: params
    }))

    dispatch(setLoading(false));

    if (json?.success) {
      setFilters({
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
      })
    }
  }, [dispatch])

  //  options dialog
  const handleCloseDialog = useCallback(() => {
    setDialogOptions({
      open: false,
      title: '',
      content: ''
    })
  }, [])

  // confirm delete or update
  const handleOpenDialog = () => {
    // ưu tiên delete trước nếu có cái cần delete thì sẽ call api delete trước
    if (productsDeleted && productsDeleted.length > 0) {
      setDialogOptions({
        open: true,
        title: 'Confirm Delete',
        content: 'Do you want to delete all selected item ?',
        onClose: () => handleCloseDialog(),
        onConfirm: () => editProduct(productsDeleted)
      })
      return;
    }

    // sau đó mới đến update
    if (productsEdited && productsEdited.length > 0) {
      setDialogOptions({
        open: true,
        title: 'Confirm Update',
        content: 'Do you want to update this product ?',
        onClose: () => handleCloseDialog(),
        onConfirm: () => editProduct(productsEdited)
      })

      return;
    }
  }
  // add Product edited
  const handleAddProductEdited = (changed: boolean, id: string, price: string, stock: string) => {
    // nếu value sau khác value trước changed = true thì adđ vào array
    if (changed) {
      if (productsEdited?.length === 0) {
        setProductsEdited([{
          id: id,
          price: price,
          stock: stock
        }])

        return;
      }

      setProductsEdited((prev) => {
        const isExisted = prev.findIndex(item => item.id === id);
        if (isExisted >= 0) {
          prev[isExisted] = {
            id: id,
            price: price,
            stock: stock
          }

          return prev
        }

        return [...prev, {
          id: id,
          price: price,
          stock: stock
        }]
      })
    } else {
      // nếu 2 value bằng nhau thì xóa cái đó trong array đi
      if (productsEdited) {
        const newArr = productsEdited?.filter(item => item.id !== id);
        setProductsEdited(newArr);
      }
    }
  }

  // add product delete 
  const handleAddDeleteProduct = (id: string, isDeleting: boolean) => {
    // nếu đang được chọn thì cho vào mảng 
    if (isDeleting) {
      // xét nếu tồn tại thì không thêm còn tồn tại thì thêm
      const isExisted = productsDeleted.findIndex(item => item.id === id);
      console.log(isExisted);

      if (isExisted < 0) {
        setProductsDeleted(prev => {
          return [
            ...prev,
            {
              id: id,
              delete: 1
            }
          ]
        })
      }
      return;
    }

    // nếu đang không ở trạng thái isdeleting thì bỏ khỏi mảng
    setProductsDeleted(prev => prev.filter(item => item.id !== id))
  }

  // fetch API để dowload file CSV
  const fetchDataToExportCSV = useCallback(async () => {
    setDialogOptions({
      open: false,
      title: '',
      content: ''
    })
    dispatch(setLoading(true));
    const json = await dispatch(fetchThunk(API_PATHS.fetchFileCSV, 'post', {}))
    dispatch(setLoading(false));

    // const data = await json.data.file.blob();


    // chưa dowload

  }, [dispatch])

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
                  handleAddProductEdited={handleAddProductEdited}
                  handleAddDeleteProduct={handleAddDeleteProduct}
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
            <Button
              sx={{
                backgroundColor: "#f0ad4e",
                color: '#fff'
              }}
              disabled={
                productsDeleted?.length === 0
                && productsEdited.length === 0
              }
              onClick={handleOpenDialog}
            >
              {productsDeleted && productsDeleted.length > 0 ? 'Delete selected item' : 'Save changes'}
            </Button>
          </div>
          <div >
            <Button
              sx={{
                backgroundColor: "#f0ad4e",
                color: '#fff'
              }}
              onClick={() => {
                setDialogOptions({
                  open: true,
                  title: 'Confirm Export',
                  content: 'Do you want to export all products ?',
                  onClose: () => handleCloseDialog(),
                  onConfirm: () => fetchDataToExportCSV()
                })
              }}
            >
              Export all: CSV
            </Button>
          </div>
        </UtilComponent >
      </div>
      <ConfirmDialog {...dialogOptions} />
    </>
  )
}

export default ProductsPage