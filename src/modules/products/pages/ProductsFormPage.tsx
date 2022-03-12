import React, { useCallback, useEffect, useState } from 'react'
import { useStyles } from '../../../styles/makeStyles'
import { DARK_BLUE, WHITE_COLOR } from '../../../configs/colors';
import ProductForm from '../components/ProductForm';
import { push } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk, fetchThunkImage } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { FormValuesProps, detailsProductProps } from '../../../models/products';
import { useParams } from 'react-router';
import { setLoading } from '../../common/redux/loadingReducer';
import { ArrowBackIcon } from '../../common/components/Icons';


interface Props { }

const ProductsFormPage = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const params = useParams<{ id: string }>();
  const [detailsProduct, setDetailsProduct] = useState<detailsProductProps>();

  const onPostFile = useCallback(async (formData: FormData) => {
    const json = await dispatch(fetchThunk(API_PATHS.createProduct, 'post', formData));

    console.log(json)
  }, [])

  const onPostProduct = useCallback(async (values: FormValuesProps) => {
    const { images, ...others } = values;
    const newData = {
      ...others,
      shipping_to_zones: others.shipping_to_zones.map(item => ({ id: item.id, price: item.price }))
    }

    const formData = new FormData();
    formData.append('productDetail', JSON.stringify(newData))

    const json = await dispatch(fetchThunkImage(API_PATHS.createProduct, 'post', formData));

    console.log(json);

  }, [dispatch])

  const fetchProductDetails = useCallback(async (id: string) => {

    dispatch(setLoading(true));

    const json = await dispatch(fetchThunk(API_PATHS.getProductDetail, 'post', { id: id }));

    dispatch(setLoading(false));

    if (json?.success) {
      setDetailsProduct(json.data)
    }
  }, [dispatch])

  useEffect(() => {
    if (params?.id) {
      fetchProductDetails(params.id)
    }
  }, [params.id, fetchProductDetails])

  return (
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
                dispatch(push(ROUTES.productList))
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
            productDetails={detailsProduct ? detailsProduct : undefined}
            title={detailsProduct?.name ? detailsProduct?.name : 'Add product'}
            onPostProduct={
              (values: FormValuesProps) =>
                onPostProduct(values)
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ProductsFormPage