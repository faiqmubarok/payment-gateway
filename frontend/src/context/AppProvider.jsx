import { TransactionProvider } from "./TransactionContext";
import { AlertProvider } from "./AlertContext";
import propTypes from "prop-types";

const AppProvider = ({ children }) => {
  return (
    <TransactionProvider>
      <AlertProvider>{children}</AlertProvider>
    </TransactionProvider>
  );
};

AppProvider.propTypes = {
  children: propTypes.node,
};

export default AppProvider;
