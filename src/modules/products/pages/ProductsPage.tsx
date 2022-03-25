import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react'
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { push, replace } from 'connected-react-router';
import { useHistory } from 'react-router';
import qs from 'query-string'
import { API_PATHS } from '../../../configs/api';
import { FilterProps, EditProps, DeleteProps } from '../../../models/products';
import { AppState } from '../../../redux/reducer';
import { useStyles } from '../../../styles/makeStyles'
import CustomPagination from '../../common/components/CustomPagination';
import { fetchThunk } from '../../common/redux/thunk';
import ProductFilterForm from '../components/ProductFilterForm';
import UtilComponent from '../../common/components/UtilComponent';
import ProductTable from '../components/ProductTable';
import ConfirmDialog, { DialogProps } from '../../common/components/ConfirmDialog';
import { ROUTES } from '../../../configs/routes';
import ScrollBar from '../../common/components/ScrollBar';
import SnackBarCustom from '../../common/components/SnackBarCustom';
import { SnackBarProps } from '../../../models/snackbar';
import useProducts from '../../common/hooks/useProducts';
import SpinnerLoading from '../../common/components/Loading/SpinnerLoading';

const ProductsPage = () => {
  const classes = useStyles();
  const { location } = useHistory()
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [filters, setFilters] = useState<FilterProps>(() => {
    const queryObject: any = qs.parse(location.search);
    const { vendor, ...others } = queryObject;
    const vendorQueryObject = qs.parse(vendor);
    // khởi tạo giá trị cho state filters
    return ({
      category: others.category
        ? others.category
        : "0",
      count: others.count
        ? others.count
        : 25,
      order_by: others.order_by
        ? others.order_by
        : "ASC",
      page: others.page
        ? others.page
        : '1',
      search: others.search
        ? others.search
        : "",
      search_type: others.search_type
        ? others.search_type
        : "",
      sort: others.sort
        ? others.sort
        : "name",
      stock_status: others.stock_status
        ? others.stock_status
        : "all",
      vendor: vendorQueryObject
        ? vendorQueryObject as FilterProps['vendor']
        : {
          id: '',
          value: ''
        },
      availability: others.availability
        ? others.availability
        : 'all'
    })
  });

  const {
    data: products,
    total,
    isLoading,
    error,
    mutate
  } = useProducts(API_PATHS.getProductFiltering, filters);

  const [productsEdited, setProductsEdited] = useState<EditProps[] | []>([]);

  const [productsDeleted, setProductsDeleted] = useState<DeleteProps[] | []>([]);

  const [isDeletingAll, setIsDeletingAll] = useState(false)

  const [dialogOptions, setDialogOptions] = useState<DialogProps>({
    open: false,
    title: '',
    content: '',
  });

  const [snackbarOptions, setSnackbarOptions] = useState<SnackBarProps>({
    message: '',
    open: false,
  })

  const tableRef = useRef<HTMLTableElement>(null);

  // close snackbar
  const onCloseSnackBar = useCallback(() => {
    setSnackbarOptions({
      message: '',
      open: false,
    })
  }, [])

  // add filter values to filter state
  const handleChangeFilter = useCallback((newFilters: FilterProps) => {
    const { vendor, ...others } = newFilters
    const othersQueryString = qs.stringify(others);

    const vendorQueryString = qs.stringify({
      vendor: qs.stringify(vendor)
    });

    const filterQueryString = othersQueryString + '&' + vendorQueryString

    dispatch(replace(`${ROUTES.productList}?${filterQueryString}`));

    setFilters(newFilters)
  }, [dispatch])

  // call api edit product
  const editProduct = useCallback(async (
    params: EditProps[] | DeleteProps[]
  ) => {

    setDialogOptions({
      open: false,
      title: '',
      content: ''
    })

    const json = await dispatch(fetchThunk(API_PATHS.editProduct, 'post', {
      params: params
    }))

    if (json?.success) {
      setSnackbarOptions({
        open: true,
        message: 'Your change is success!',
        type: 'success'
      });

      setProductsEdited([]);
      setIsDeletingAll(false)
      setProductsDeleted([]);

      mutate()
      return;
    }

    setSnackbarOptions({
      open: false,
      message: 'Your change is failed!',
      type: 'error'
    });

    setProductsEdited([]);
    setIsDeletingAll(false)
    setProductsDeleted([]);

  }, [dispatch, mutate])

  //  options dialog
  const handleCloseDialog = useCallback(() => {
    setDialogOptions({
      open: false,
      title: '',
      content: ''
    })
  }, []);

  // open dialog cho enable
  const openConfirmEnable = useCallback((params: EditProps[]) => {
    setDialogOptions({
      open: true,
      title: 'Confirm Update',
      content: 'Do you want to update this row?',
      onClose: () => handleCloseDialog(),
      onConfirm: () => editProduct(params)
    })
  }, [handleCloseDialog, editProduct])

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
  const handleAddProductEdited = (
    changed: boolean,
    id: string,
    price: string,
    stock: string) => {
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

  const checkDeletingAll = useCallback(() => {
    if (products && products.length > 0) {
      // check nếu tất cả sản phẩm trong product đều ở trong productDeleted
      const hasAll = products.every(product => {

        const isInDeleteArr = productsDeleted?.find(item => +item.id === +product.id)

        if (isInDeleteArr) {
          return true;
        }

        return false
      })

      if (hasAll) {
        setIsDeletingAll(true);
        return;
      }

      console.log('chạy')
      setIsDeletingAll(false);

      return;
    }

    setIsDeletingAll(false);
  }, [products, productsDeleted])

  useEffect(() => {
    if (productsDeleted && productsDeleted.length > 0) {
      checkDeletingAll()
    }
  }, [productsDeleted])

  useEffect(() => {
    if (!location.search) {
      setFilters({
        category: "0",
        count: 25,
        order_by: "ASC",
        page: '1',
        search: "",
        search_type: "",
        sort: "name",
        stock_status: "all",
        vendor: {
          id: '',
          value: ''
        },
        availability: 'all'
      })
    }

    // chỉ edit được ở trong trang đang nhìn 
    setProductsEdited([]);

    // option 2 xóa product theo từng trang
    // sau khi chuyển location sẽ check lại trạng thái của delete all 
    checkDeletingAll()

    // chuyển trang MỚI thì scroll to top
    window.scrollTo(0, 0);
  }, [location])

  if (isLoading) {
    return <SpinnerLoading />
  }

  return (
    <>
      <div className={classes.mainPage}>
        <div style={{
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
          <ProductFilterForm
            filters={filters}
            onChangeFilter={handleChangeFilter}
          />
          <div>
            {/* Add product Button */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start'
            }}>
              <div className={classes.mainButton}>
                <Button
                  onClick={() => {
                    dispatch(push(ROUTES.addProduct))
                  }}>
                  Add Products
                </Button>
              </div>
            </div>
            {error
              &&
              <Typography variant="h1" component='h1'>Sorry, fetching data is failed</Typography>}
            {/* Table */}
            {products && (
              <ProductTable
                isDeletingAll={isDeletingAll}
                products={products}
                handleAddProductEdited={handleAddProductEdited}
                handleAddDeleteProduct={handleAddDeleteProduct}
                onChangeFilter={handleChangeFilter}
                openDialog={openConfirmEnable}
                productsDeleted={productsDeleted}
                filters={filters}
                ref={tableRef}
              />
            )}
          </div>
          <CustomPagination
            filters={filters}
            onChangeFilter={handleChangeFilter}
            totalLengthProducts={+total}
            numberProductsPerPage={+filters.count}
            optionsLengthPerPage={[
              '10',
              '25',
              '50',
              '75',
              '100'
            ]}
          />
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
              {productsDeleted
                && productsDeleted.length > 0
                ? 'Delete selected item'
                : 'Save changes'}
            </Button>
          </div>
        </UtilComponent >
        <ScrollBar tableRef={tableRef} />
      </div>
      <ConfirmDialog {...dialogOptions} />
      <SnackBarCustom
        open={snackbarOptions.open}
        message={snackbarOptions.message}
        type={snackbarOptions.type}
        duration={snackbarOptions.duration}
        onClose={onCloseSnackBar}
      />
    </>
  )
}

export default ProductsPage