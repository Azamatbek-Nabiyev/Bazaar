import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./NotFound";
import Home from "./Dashboard";
import Settings from "./Settings";
import Products from "./Products";
import Categories from "./Categories";
import Orders from "./Orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "settings", element: <Settings /> },
      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
      { path: "orders", element: <Orders /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);