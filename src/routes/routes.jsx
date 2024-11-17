import React , { lazy, Suspense, useState } from "react";
// import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Error404 from "../pages/default/Error404";

import HomePage from "../pages/OtherPage/Home/HomePage";
import DashboardChildrenRoutes from "./src/DashboardChildrenRoutes";
import PrivateRoute from "./src/routes/PrivateRoute";
import CartPage from "../components/Home/cart/CartPage";
import CheckoutPage from "../components/Home/checkout/CheckoutPage";
import Success from "../components/Home/success/Success";
import Cancel from "../components/Home/cancel/Cancel";
import ProductPage from "../components/Home/Products/ProductPage";

// Continue for other components...

const Root_Dashboard = lazy(() => import(  "../pages/Dashboard/Root"))
import SignUpPage from  "../pages/authentication/signup/Signup";
import Login from  "../pages/authentication/login/Login";
import ForgotPassword from  "../pages/authentication/forgot-password/ForgotPassword";
import VerifyOTP from  "../pages/authentication/verify-otp/VerifyOTP";
import SendOTP from  "../pages/authentication/send-otp/SendOTP";

import GlobalLoading from "../components library/GlobalLoading";

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
          path: "signup",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            
                <SignUpPage />
          ),
        },
        {
          // path: "addworkout",
          path: "login",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            
                <Login />
          ),
        },
        {
          // path: "addworkout",
          path: "forgot-password",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            
                <ForgotPassword />
          ),
        },
        {
          // path: "addworkout",
          path: "verify-otp",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            
                <VerifyOTP />
          ),
        },
        {
          // path: "addworkout",
          path: "send-otp",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
           
                <SendOTP />
          ),
        },
        {
          // path: "addworkout",
          path: "checkout",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
           
                <CheckoutPage />
          ),
        },
        {
          // path: "addworkout",
          path: "cart",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            
                <CartPage />
          ),
        },
        {
          // path: "addworkout",
          path: "products/:id",
          // path: isPermittedRoute("addworkout"),
          element: (
            
                <ProductPage />
          ),
        },
        {
          // path: "addworkout",
          path: "success",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
                <Success />
            
          ),
        },
        {
          // path: "addworkout",
          path: "cancel",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
                <Cancel />
            
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
        <PrivateRoute>
        <Root_Dashboard />

      </PrivateRoute>

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
