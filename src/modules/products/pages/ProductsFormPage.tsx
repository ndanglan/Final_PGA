import React, { useCallback, useEffect, useState } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { goBack, replace } from 'connected-react-router';
import { Action } from 'typesafe-actions';
import { useParams } from 'react-router';
import { ROUTES } from '../../../configs/routes';
import { DARK_BLUE, WHITE_COLOR } from '../../../configs/colors';
import { API_PATHS } from '../../../configs/api';
import { useStyles } from '../../../styles/makeStyles'
import ProductForm from '../components/ProductForm';
import { AppState } from '../../../redux/reducer';
import { fetchThunkFormData } from '../../common/redux/thunk';
import { FormValuesProps } from '../../../models/products';
import { setLoading } from '../../common/redux/loadingReducer';
import { ArrowBackIcon } from '../../common/components/Icons';
import { dateTypeToStringType } from '../../common/utils';
import SnackBarCustom from '../../common/components/SnackBarCustom';
import { SnackBarProps } from '../../../models/snackbar';
import useProductDetail from '../../common/hooks/useProductDetail';
import SpinnerLoading from '../../common/components/Loading/SpinnerLoading';
import { Typography } from '@mui/material';

const ProductsFormPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const params = useParams<{ id: string }>();

  const {
    data: detailsProduct,
    isLoading,
    error,
    mutate
  } = useProductDetail(params?.id);

  const [snackbarOptions, setSnackbarOptions] = useState<SnackBarProps>({
    message: '',
    open: false,
  })

  // close snackbar
  const onCloseSnackBar = useCallback(() => {
    setSnackbarOptions({
      message: '',
      open: false,
    })
  }, [])

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
    const {
      images,
      id,
      categories,
      shipping_to_zones,
      arrival_date,
      ...others } = values;

    let newData;
    // format l???i values tr?????c khi g???i l??n server
    if (id) {
      // c?? id l?? ??ang update
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
      // kh??ng c?? id l?? ??ang create 
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

    // g???i api t???o  create product tr?????c
    const json = await dispatch(fetchThunkFormData(API_PATHS.createProduct, 'post', formData));

    // tr?????ng h???p success
    if (json.success) {
      const status = await onPostFile(json?.data, images);

      dispatch(setLoading(false));

      if (status.length > 0 && status.every(item => item.success === true)) {
        // n???u status c?? ????? d??i l???n h??n 0 ngh??a l?? ???? c?? image up l??n  v?? check t???t c??? ph???i success th?? show snackbar th??nh c??ng

        setSnackbarOptions({
          open: true,
          message: 'Your change is success!',
          type: 'success',
          duration: 1000
        });

        // sau khi show snackbar th??nh c??ng check n???u kh??ng c?? id th?? push ?????n trang detail
        if (!id) {
          // n???u kh??ng c?? id l?? ??ang ??? trang create chuy???n sang trang detail
          setTimeout(() => {
            dispatch(replace(`${ROUTES.productDetail}/${json.data}`))
          }, 1000)

          return;
        }

        // n???u c?? id th?? ??? l???i 
        mutate()
        return;
      }


      // n???u kh??ng upload ???nh th?? show snackbar lu??n v?? kh??ng chuy???n trang 
      setSnackbarOptions({
        open: true,
        message: 'Your change is success!',
        type: 'success',
        duration: 1000
      })

      // n???u c?? id th?? fetch l???i detail sau khi update
      mutate()
      return;
    }

    // tr?????ng h???p call api creaate product failed
    dispatch(setLoading(false));

    setSnackbarOptions({
      open: true,
      message: json.data.errors,
      type: 'error'
    })

  }, [dispatch, onPostFile, mutate])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  // n???u kh??ng c?? data v?? c?? id th?? ngh??a l?? ??ang fetch detail
  if (isLoading && params?.id) {
    return <SpinnerLoading />
  }

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
            {error
              &&
              <Typography variant='h1' component='h1'> Fetching data is failed</Typography>}
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