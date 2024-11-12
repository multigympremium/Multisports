import { lazy, Suspense, useState } from "react";
// import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
const Error404 = lazy(() => import("../pages/default/Error404"));

import PublicRoute from "./src/routes/PublicRoute";
import Login_Register from "../pages/LoginAndRegister/Login_Registration";
import HomePage from "../pages/OtherPage/Home/HomePage";
import DashboardChildrenRoutes from "./src/DashboardChildrenRoutes";
const ProductPage = lazy(() => import("../components/Home/Products/ProductPage"));

// Continue for other components...

const Root_Dashboard = lazy(() => import("../pages/Dashboard/Root"));

const GlobalLoading = lazy(() => import("../components library/GlobalLoading"));

const AllRoutes = () => {
  // const [permissionData, setPermissionData] = useState([]);
  const dashboardChildrenRoutes = DashboardChildrenRoutes();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        // <Root />
        <Root />
      ),
      // errorElement: <Error404 />,
      children: [
        {
          path: "",
          element: (
            // <PublicRoute>
            // </PublicRoute>
            // <Login />
            // <PublicRoute>
            // </PublicRoute>
              <HomePage />
          ),
        },
        {
          // path: "addworkout",
          path: "products/:id",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            <Suspense fallback={<GlobalLoading />}>
                <ProductPage />
              
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        // <PrivateRoute>
        //   <Rootdashboard></Rootdashboard>
        // </PrivateRoute>

        // <Rootdashboard />
        <Suspense fallback={<GlobalLoading />}>
          <Root_Dashboard />
        </Suspense>
      ),

      // errorElement: <Error404></Error404>,
      children: dashboardChildrenRoutes,
    },
  ]);

  return routes;
};

const router = AllRoutes();

export default router;
