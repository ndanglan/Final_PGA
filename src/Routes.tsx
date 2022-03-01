import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const ProductsPage = lazy(() => import('./modules/products/pages/ProductsPage'));
const UsersPage = lazy(() => import('./modules/users/pages/UsersPage'));

interface Props { }

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <ProtectedRoute path={ROUTES.productList} component={ProductsPage} />
        <ProtectedRoute path={ROUTES.userList} component={UsersPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
