import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import SuspenseSpinner from "../components/SuspenseFallback";

const Home = lazy(() => import('./../Pages/Home'));
const Admin = lazy(() => import('./../Pages/Admin'))

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
    { path: "/", element: <Home /> },
    {path: "/admin", element: <Admin />},
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