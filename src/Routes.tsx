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
        {/* main layout cho cacs phaanf sau login */}
        <Route exact path={ROUTES.login} component={LoginPage} />
        <Route exact path="/" component={LoginPage} />

        <MainLayout>
          <ProtectedRoute exact path={ROUTES.productList} component={ProductsPage} />
          <ProtectedRoute exact path={ROUTES.userList} component={UsersPage} />
        </MainLayout>

      </Switch>
    </Suspense>
  );
};
