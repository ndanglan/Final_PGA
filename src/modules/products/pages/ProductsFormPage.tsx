import React, { useCallback, useEffect, useState } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { push, goBack } from 'connected-react-router';
import { Action } from 'typesafe-actions';
import { useParams } from 'react-router';
import { ROUTES } from '../../../configs/routes';
import { DARK_BLUE, WHITE_COLOR } from '../../../configs/colors';
import { API_PATHS } from '../../../configs/api';
import { useStyles } from '../../../styles/makeStyles'
import ProductForm from '../components/ProductForm';
import { AppState } from '../../../redux/reducer';
import { fetchThunk, fetchThunkFormData } from '../../common/redux/thunk';
import { FormValuesProps, detailsProductProps } from '../../../models/products';
import { setLoading } from '../../common/redux/loadingReducer';
import { ArrowBackIcon } from '../../common/components/Icons';
import { dateTypeToStringType } from '../../common/utils';
import SnackBarCustom from '../../common/components/SnackBarCustom';
import { SnackBarProps } from '../../../models/snackbar';

const ProductsFormPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const params = useParams<{ id: string }>();

  const [detailsProduct, setDetailsProduct] = useState<detailsProductProps>();

  const [snackbarOptions, setSnackbarOptions] = useState<SnackBarProps>({
    message: '',
    open: false,
  })

  // close snackbar
  const onCloseSnackBar = () => {
    setSnackbarOptions({
      message: '',
      open: false,
    })
  }

  const fetchProductDetails = useCallback(async (id: string) => {

    dispatch(setLoading(true));

    const json = await dispatch(fetchThunk(API_PATHS.getProductDetail, 'post', { id: id }));

    dispatch(setLoading(false));

    if (json?.success) {
      setDetailsProduct(json.data)
    }
  }, [dispatch])

  const onPostFile = useCallback(async (id: string, data: File[]) => {

    // const status=[];
    const uploadFile = [];
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const formDataFile = new FormData();
        formDataFile.append('productId', id);
        formDataFile.append('order', `${i}`);
        formDataFile.append('images[]', data[i]);
        uploadFile.push(dispatch(fetchThunkFormData(API_PATHS.uploadImg, 'post', formDataFile)))
      }

      return await Promise.all(uploadFile)
    }

    return []
  }, [dispatch])

  const onPostProduct = useCallback(async (values: FormValuesProps) => {
    const { images, id, categories, shipping_to_zones, arrival_date, ...others } = values;

    let newData;
    // format lại values trước khi gửi lên server
    if (id) {
      // có id là đang update
      newData = {
        ...others,
        id: id,
        shipping_to_zones: shipping_to_zones.map(item => ({ id: item.id, price: item.price })),
        categories: categories.length > 0 ? categories.map(item => {
          if (item.id) {
            return +item.id
          }

          return item.id
        }) : [],
        arrival_date: dateTypeToStringType(arrival_date)
      }
    } else {
      // không có id là đang create 
      newData = {
        ...others,
        shipping_to_zones: shipping_to_zones.map(item => ({ id: item.id, price: item.price })),
        categories: categories.length > 0 ? categories.map(item => {
          if (item.id) {
            return +item.id
          }

          return item.id
        }) : [],
        arrival_date: dateTypeToStringType(arrival_date)
      }
    }

    const formData = new FormData();
    formData.append('productDetail', JSON.stringify(newData))

    dispatch(setLoading(true));

    // gọi api tạo  create product trước
    const json = await dispatch(fetchThunkFormData(API_PATHS.createProduct, 'post', formData));

    // trường hợp success
    if (json.success) {
      const status = await onPostFile(json?.data, images);

      dispatch(setLoading(false));

      if (status.length > 0 && status.every(item => item.success === true)) {
        // nếu status có độ dài lớn hơn 0 nghĩa là đã có image up lên  và check tất cả phải success thì show snackbar thành công

        setSnackbarOptions({
          open: true,
          message: 'Your change is success!',
          type: 'success',
          duration: 1000
        });

        // sau khi show snackbar thành công check nếu không có id thì push đến trang detail
        if (!id) {
          // nếu không có id là đang ở trang create chuyển sang trang detail
          setTimeout(() => {
            dispatch(push(`${ROUTES.productDetail}/${json.data}`))
          }, 1000)

          return;
        }

        // nếu có id thì ở lại 
        fetchProductDetails(id)
        return;
      }


      // nếu không upload ảnh thì show snackbar luôn và không chuyển trang 
      setSnackbarOptions({
        open: true,
        message: 'Your change is success!',
        type: 'success',
        duration: 1000
      })

      // nếu có id thì fetch lại detail sau khi update
      fetchProductDetails(id)
      return;
    }

    // trường hợp call api creaate product failed
    dispatch(setLoading(false));

    setSnackbarOptions({
      open: true,
      message: json.data.errors,
      type: 'error'
    })

  }, [dispatch, onPostFile, fetchProductDetails])

  useEffect(() => {
    if (params?.id) {
      fetchProductDetails(params.id)
    }
  }, [params.id, fetchProductDetails])

  return (
    <>
      <div className={classes.mainPage} >
        <div style={{
          height: 'auto',
        }}>
          <div style={{
            marginBottom: '30px'
          }}>
            <div>
              <button
                style={{
                  color: DARK_BLUE,
                  backgroundColor: WHITE_COLOR,
                  width: '32px !important',
                  minWidth: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  outline: 'none',
                  border: `1px solid ${WHITE_COLOR}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: "center"
                }}
                onClick={() => {
                  dispatch(goBack())
                }}
              >
                <ArrowBackIcon sx={{
                  width: '20px',
                  height: '20px'
                }} />
              </button>
            </div>
          </div>
          <div>
            <ProductForm
              productDetails={
                detailsProduct
                  ? detailsProduct
                  : undefined}
              title={
                detailsProduct?.name
                  ? detailsProduct?.name
                  : 'Add product'
              }
              onPostProduct={
                (values: FormValuesProps) =>
                  onPostProduct(values)
              }
            />
          </div>
        </div>
      </div>
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

export default ProductsFormPage