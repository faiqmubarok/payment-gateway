import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Layout
import DefaultLayout from "./layouts/DefaultLayout";

// Pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import Transactions from "./pages/Transactions";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import ManageProducts from "./pages/ManageProducts";
import ManageTransactions from "./pages/ManageTransactions";
import Users from "./pages/Users";
import NotAccess from "./pages/auth/NotAccess";

// Utils
import PageTitle from "./components/PageTitle";
import AppProvider from "./context/AppProvider";

const isAuthenticated = () => {
  const storedData = sessionStorage.getItem("authToken");
  if (!storedData) return null;

  try {
    const userData = JSON.parse(storedData);
    return userData;
  } catch (err) {
    console.error("Error parsing user data:", err);
    return null;
  }
};

const App = () => {
  const { pathname } = useLocation();
  const userIsLoggedIn = isAuthenticated();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <AppProvider>
        <Routes>
          <Route
            path="/"
            element={
              userIsLoggedIn ? (
                <>
                  <PageTitle title="Homepage | Top-It" />
                  <DefaultLayout>
                    <Home />
                  </DefaultLayout>
                </>
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/products/all-products"
            element={
              userIsLoggedIn ? (
                <>
                  <PageTitle title="Products | Top-It" />
                  <DefaultLayout>
                    <Product />
                  </DefaultLayout>
                </>
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/products/manage"
            element={
              userIsLoggedIn ? (
                userIsLoggedIn.user.role === "admin" ? (
                  <>
                    <PageTitle title="Manage Products | Top-It" />
                    <DefaultLayout>
                      <ManageProducts />
                    </DefaultLayout>
                  </>
                ) : (
                  <>
                    <PageTitle title="Not Access | Top-It" />
                    <DefaultLayout>
                      <NotAccess />
                    </DefaultLayout>
                  </>
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/transactions/all-transactions"
            element={
              userIsLoggedIn ? (
                <>
                  <PageTitle title="Transactions | Top-It" />
                  <DefaultLayout>
                    <Transactions />
                  </DefaultLayout>
                </>
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/transactions/manage"
            element={
              userIsLoggedIn ? (
                userIsLoggedIn.user.role === "admin" ? (
                  <>
                    <PageTitle title="Manage Transactions | Top-It" />
                    <DefaultLayout>
                      <ManageTransactions />
                    </DefaultLayout>
                  </>
                ) : (
                  <>
                    <PageTitle title="Not Access | Top-It" />
                    <DefaultLayout>
                      <NotAccess />
                    </DefaultLayout>
                  </>
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/users"
            element={
              userIsLoggedIn ? (
                userIsLoggedIn.user.role === "admin" ? (
                  <>
                    <PageTitle title="Users | Top-It" />
                    <DefaultLayout>
                      <Users />
                    </DefaultLayout>
                  </>
                ) : (
                  <>
                    <PageTitle title="Not Access | Top-It" />
                    <DefaultLayout>
                      <NotAccess />
                    </DefaultLayout>
                  </>
                )
              ) : (
                <Login />
              )
            }
          />

          {/* Authentication */}
          <Route
            path="/login"
            element={
              <>
                <PageTitle title="Login | Top-It" />
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <PageTitle title="Register | Top-It" />
                <Register />
              </>
            }
          />

          {/* 404 Error Page */}
          <Route
            path="*"
            element={
              <>
                <PageTitle title="404 | Top-It" />
                <NotFound />
              </>
            }
          />
        </Routes>
      </AppProvider>
    </>
  );
};

export default App;
