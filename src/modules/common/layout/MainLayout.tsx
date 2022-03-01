import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux';
import Header from '../components/Header'
import SideBar from '../components/SideBar';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { setLogoutAction } from '../../auth/redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { push } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
interface Props {
  children: any,
}

const MainLayout = (props: Props) => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const user = useSelector((state: AppState) => state.profile.user);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const handleSideBarAction = () => setSideBarOpen(prev => !prev);

  const handleLogOut = () => {
    dispatch(setLogoutAction());
    Cookies.remove(ACCESS_TOKEN_KEY);
    dispatch(push(ROUTES.login))
  }

  return (
    <div>
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
          flexGrow: 1,
          padding: '36px',
          marginLeft: sideBarOpen ? '280px' : 0,
          transition: '0.225s',
          backgroundColor: '#191836',
          color: '#fff'
        }}>
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout