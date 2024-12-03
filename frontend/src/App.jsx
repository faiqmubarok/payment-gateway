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

// Utils
import PageTitle from "./components/PageTitle";
import AppProvider from "./context/AppProvider";

const isAuthenticated = () => {
  return !!sessionStorage.getItem("authToken");
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
            path="/products"
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
            path="/transactions"
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
