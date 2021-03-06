import React, { useCallback, useState } from 'react'
import { Action } from 'redux';
import { useSelector } from 'react-redux';
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

interface Props {
  children: any,
}

const MainLayout = (props: Props) => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const user = useSelector((state: AppState) => state.profile.user);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  // điều khiển side bar
  const handleSideBarAction = useCallback(() => {
    setSideBarOpen(prev => !prev)
  }, []);

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