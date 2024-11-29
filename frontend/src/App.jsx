import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Product from "./pages/Product";
import Login from "./pages/auth/Login";

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
    <Routes>
      <Route
        path="/"
        element={
          userIsLoggedIn ? (
            <>
              <PageTitle title="Products | Dummy Provider" />
              <Product />
            </>
          ) : (
            <Login />
          )
        }
      />
    </Routes>
  );
};

export default App;
