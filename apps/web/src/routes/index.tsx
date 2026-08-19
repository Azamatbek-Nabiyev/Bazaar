import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ProductDetail from "./ProductDetail";
import NotFound from "./NotFound";
import Home from "./Home";
import Cart from "./Cart";
import SavedItems from "./SavedItems";
import Profile from "./Profile";
import Checkout from "./Checkout";
import Products from "./Products";
import AboutUs from "./About";
import Contact from "./Contact";
import Register from "./Register";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

// Every route below renders inside Layout (Header + Footer),
// except NotFound which is intentionally kept outside so a broken
// URL doesn't look like a valid page with working nav.
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "saved-items", element: <SavedItems /> },
      { path: "profile", element: <Profile /> },
      { path: "checkout", element: <Checkout /> },
      { path: "products", element: <Products /> },
      { path: "about", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);