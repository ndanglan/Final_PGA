import React, { useCallback, useEffect, useState } from 'react'
import { Action } from 'redux';
import { useSelector } from 'react-redux';
import { fetchThunk } from '../redux/thunk';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Cookies from 'js-cookie';
import { push } from 'connected-react-router';
import Header from '../components/Header'
import SideBar from '../components/SideBar';
import { AppState } from '../../../redux/reducer';
import { setLogoutAction } from '../../auth/redux/authReducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { API_PATHS } from '../../../configs/api';
import {
  setCategories,
  setVendors,
  setShipping,
  setConditions,
  setBrands,
  setCountries
} from '../redux/commonReducers';
interface Props {
  children: any,
}

const MainLayout = (props: Props) => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const user = useSelector((state: AppState) => state.profile.user);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const fetchData = useCallback(async (url: string) => {
    const json = await dispatch(fetchThunk(url));

    if (json.success) {
      return json.data
    }

    // handle error
  }, [dispatch]);

  const fetchAllData = useCallback(async () => {

    const [
      categoriesData
      , vendorsData
      , brandsData
      , conditionsData
      , shippingData
      , countriesData
    ] = await Promise.all([
      fetchData(API_PATHS.getCategory),
      fetchData(API_PATHS.getVendors),
      fetchData(API_PATHS.getBrands),
      fetchData(API_PATHS.getConditions),
      fetchData(API_PATHS.getShipping),
      fetchData(API_PATHS.getCountry)
    ]);

    if (
      categoriesData.length >= 0
      && vendorsData.length >= 0
      && brandsData.length >= 0
      && conditionsData.length >= 0
      && shippingData.length >= 0
      && countriesData.length >= 0
    ) {

      dispatch(setCategories(categoriesData))
      dispatch(setVendors(vendorsData))
      dispatch(setShipping(shippingData))
      dispatch(setConditions(conditionsData))
      dispatch(setBrands(brandsData))
      dispatch(setCountries(countriesData))
    }

    // handle error
  }, [dispatch, fetchData]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData])

  // điều khiển side bar
  const handleSideBarAction = useCallback(() => setSideBarOpen(prev => !prev), []);

  // logout function
  const handleLogOut = useCallback(() => {
    dispatch(setLogoutAction());

    Cookies.remove(ACCESS_TOKEN_KEY);

    dispatch(push(ROUTES.login));
  }, [dispatch])

  return (
    <div >
      <Header
        user={user}
        handleSideBarAction={handleSideBarAction}
        handleLogOut={handleLogOut}
      />
      <SideBar
        open={sideBarOpen}
        handleSideBarAction={handleSideBarAction}
      />
      <div
        style={{
          marginLeft: sideBarOpen ? '260px' : 0,
          transition: '0.225s',
          backgroundColor: '#191836',
          color: '#fff',
          padding: '110px 36px 36px 36px',
          flex: 1
        }}>
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout