import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import LazyLoader from "@/components/LazyLoader";

const LoginPage = lazy(() => import("../pages/Login"));
const RegisterPage = lazy(() => import("../pages/Register"));
const ProductListingPage = lazy(() => import("../pages/ProductListing"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailsPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const Router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<LazyLoader />}>
                <LoginPage />
            </Suspense>
        ),
    },
    {
        path: "/register",
        element: (
            <Suspense fallback={<LazyLoader />}>
                <RegisterPage />
            </Suspense>
        ),
    },
    {
        path: "/products",
        element: (
            <Suspense fallback={<LazyLoader />}>
                <ProductListingPage />
            </Suspense>
        ),
    },
    {
        path: "/product/:id",
        element: (
            <Suspense fallback={<LazyLoader />}>
                <ProductDetailPage />
            </Suspense>
        ),
    },
    {
        path: "*",
        element: (
            <Suspense fallback={<LazyLoader />}>
                <ErrorPage />
            </Suspense>
        ),
    },
]);

export default Router;
