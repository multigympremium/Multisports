import React , { lazy, Suspense, useState } from "react";
// import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
const Error404 = lazy(() => import("../pages/default/Error404"));

import HomePage from "../pages/OtherPage/Home/HomePage";
import DashboardChildrenRoutes from "./src/DashboardChildrenRoutes";
import PrivateRoute from "./src/routes/PrivateRoute";
import CartPage from "../components/Home/cart/CartPage";
import CheckoutPage from "../components/Home/checkout/CheckoutPage";
import Success from "../components/Home/success/Success";
import Cancel from "../components/Home/cancel/Cancel";
import ProductPage from "../components/Home/Products/ProductPage";

// Continue for other components...

const Root_Dashboard = lazy(() => import( "../pages/Dashboard/Root"))
const SignUpPage = lazy(() => import( "../pages/authentication/signup/Signup"));
const Login = lazy(() => import( "../pages/authentication/login/Login"));
const ForgotPassword = lazy(() => import( "../pages/authentication/forgot-password/ForgotPassword"));
const VerifyOTP = lazy(() => import( "../pages/authentication/verify-otp/VerifyOTP"));
const SendOTP = lazy(() => import( "../pages/authentication/send-otp/SendOTP"));

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
          path: "signup",
          // path: isPermittedRoute("addworkout"),
          element: (
            // <PrivateRoute>
            //   <Addworkout />
            // </PrivateRoute>
            <Suspense fallback={<GlobalLoading />}>
                <SignUpPage />
              
            </Suspense>
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
            <Suspense fallback={<GlobalLoading />}>
                <Login />
              
            </Suspense>
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
            <Suspense fallback={<GlobalLoading />}>
                <ForgotPassword />
              
            </Suspense>
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
            <Suspense fallback={<GlobalLoading />}>
                <VerifyOTP />
              
            </Suspense>
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
            <Suspense fallback={<GlobalLoading />}>
                <SendOTP />
              
            </Suspense>
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
