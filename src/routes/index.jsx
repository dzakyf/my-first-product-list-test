import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

//admin routes
const ProductList = lazy(() => import("../pages/Admin/ProductList/index"));

//guest routes
const GuestProductList = lazy(() => import("../pages/Guest/ProductList/index"));

export const routes = [
  {
    path: "/admin/product-list",
    component: ProductList,
    exact: true,
  },
  {
    path: "/product-list",
    component: GuestProductList,
    exact: true,
  },
];

export default function Routes() {
  return (
    <Switch>
      {routes.map((route, key) => (
        <Route
          key={key}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
