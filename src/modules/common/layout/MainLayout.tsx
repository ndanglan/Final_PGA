import React, { Fragment, useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import Header from '../components/Layout/Header'
import SideBar from '../components/Layout/SideBar';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { setLogoutAction } from '../../auth/redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { push } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import UtilComponent from '../components/Layout/UtilComponent';
interface Props {
  children: any,
}

const MainLayout = (props: Props) => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const user = useSelector((state: AppState) => state.profile.user);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const handleSideBarAction = useCallback(() => setSideBarOpen(prev => !prev), []);

  const handleLogOut = useCallback(() => {
    dispatch(setLogoutAction());
    Cookies.remove(ACCESS_TOKEN_KEY);
    dispatch(push(ROUTES.login))
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
          // display: 'flex',
          padding: '110px 36px 36px 36px',
          flex: 1
        }}>
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout