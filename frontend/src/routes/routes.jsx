import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import SuspenseSpinner from "../components/SuspenseFallback";
const Home = lazy(() => import('../pages/Home'));
const Admin = lazy(() => import('../pages/Admin'))
const Login = lazy(() => import('../pages/Auth/Login'))
const Hotel = lazy(() => import('../pages/Hotel'))
const Listing = lazy(() => import('../pages/Listing'))
const Booking = lazy(() => import('../pages/Booking'))
const BookingSummary = lazy(() => import('../pages/BookingSummary'))
/**
 * @component Path 
 * @description Path is component which is the central routes of the whole application. 
 * 
 * @returns Fragment and Suspense
 */
export const Path = () => {

  /**
   * Element component takes same props as what Route takes in react-router-dom
   * in element: pass lazy elements for code splitting for code to load async.
   */
  const element = [
    { path: "/", element: <Home />, index: true },
    { path: "/login", element: <Login />},
    { path: "/admin", element: <Admin /> },
    { path: "/location/:locationID", element: <Listing />},
    { path: "/booking", element: <Booking />},
    { path: "/summary", element: <BookingSummary />},
    { path: "/hotel", element: <Hotel />},
    { path: "*", element: <h1>Not Found!</h1> }
]

  const routes = useRoutes(element);
  return(
    <React.Fragment>
        <Suspense fallback={<SuspenseSpinner />}>
          {routes}
      </Suspense>
    </React.Fragment>
  )
}