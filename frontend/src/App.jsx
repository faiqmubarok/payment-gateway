import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Layout
import DefaultLayout from "./layouts/DefaultLayout";

// Pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import Transactions from "./pages/Transactions";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";

// Utils
import PageTitle from "./components/PageTitle";

// const isAuthenticated = () => {
//   return !!sessionStorage.getItem("authToken");
// };

const App = () => {
  const { pathname } = useLocation();
  const userIsLoggedIn = true;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
    <Routes>
      <Route
        path="/"
        element={
          userIsLoggedIn ? (
            <>
              <PageTitle title="Homepage | Dummy Provider" />
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
              <PageTitle title="Products | Dummy Provider" />
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
              <PageTitle title="Transactions | Dummy Provider" />
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
        path="*"
        element={
          <>
            <PageTitle title="404 | Dummy Provider" />
            <NotFound />
          </>
        }
      />
    </Routes>
    </>
  );
};

export default App;
