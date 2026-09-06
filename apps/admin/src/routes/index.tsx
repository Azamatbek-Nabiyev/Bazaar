import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./NotFound";
import Home from "./Dashboard";
import Settings from "./Settings";
import Products from "./Products";
import Categories from "./Categories";
import Orders from "./Orders";
import Users from "./User";
import Login from "./Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "settings", element: <Settings /> },
          { path: "products", element: <Products /> },
          { path: "categories", element: <Categories /> },
          { path: "orders", element: <Orders /> },
          { path: "users", element: <Users /> },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [{ path: "login", element: <Login /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);