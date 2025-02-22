import { RouteObject } from "react-router";
import Layout from "../layout";
import Boards from "../pages/Boards";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Boards />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
