import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/Routes/ProtectedRoute';
import SpinnerLoading from './modules/common/components/Loading/SpinnerLoading';
import MainLayout from './modules/common/layout/MainLayout';

const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const ProductsPage = lazy(() => import('./modules/products/pages/ProductsPage'));
const ProductsFormPage = lazy(() => import('./modules/products/pages/ProductsFormPage'))
const UsersPage = lazy(() => import('./modules/users/pages/UsersPage'));
const UserFormPage = lazy(() => import('./modules/users/pages/UserFormPage'))

export const Routes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<SpinnerLoading />}>
      <Switch location={location}>
        {/* main layout cho cacs phaanf sau login */}
        <Route exact path={ROUTES.login} component={LoginPage} />
        <Route exact path="/" component={LoginPage} />
        <MainLayout>
          <ProtectedRoute path={ROUTES.productList} component={ProductsPage} />
          <ProtectedRoute path={`${ROUTES.addProduct}`} component={ProductsFormPage} />
          <ProtectedRoute path={`${ROUTES.productDetail}/:id`} component={ProductsFormPage} />
          <ProtectedRoute path={ROUTES.userList} component={UsersPage} />
          <ProtectedRoute path={ROUTES.addUser} component={UserFormPage} />
          <ProtectedRoute path={`${ROUTES.userDetail}/:id`} component={UserFormPage} />
        </MainLayout>

      </Switch>
    </Suspense>
  );
};
