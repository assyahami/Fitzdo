import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import ProductListingPage from "../pages/ProductListing";
import ProductDetailPage from "../pages/ProductDetailsPage";

const Router = createBrowserRouter([

    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },


    {
        path: "/products",
        element: <ProductListingPage />,
    },
    {
        path: "/product/:id",
        element: <ProductDetailPage />,
    },

    {
        path: "*",
        element: <ErrorPage />,
    },
]);

export default Router;
