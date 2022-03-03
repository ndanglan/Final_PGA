import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/Routes/ProtectedRoute';
import SpinnerLoading from './modules/common/components/Loading/SpinnerLoading';
import MainLayout from './modules/common/layout/MainLayout';

const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const ProductsPage = lazy(() => import('./modules/products/pages/ProductsPage'));
const UsersPage = lazy(() => import('./modules/users/pages/UsersPage'));

interface Props { }

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<SpinnerLoading />}>
      <Switch location={location}>

        <MainLayout>
          <ProtectedRoute path={ROUTES.productList} component={ProductsPage} />
          <ProtectedRoute path={ROUTES.userList} component={UsersPage} />
        </MainLayout>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
