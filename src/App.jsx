import React from "react";
import "./App.scss";
import { useMain } from "./contexts/MainContext";
import Alert from "./components/Alert";
import LoadingSpinner from "./components/LoadingSpinner";
import { AdminProvider } from "./contexts/AdminContext";
import { Provider } from "react-redux";
import { trainBookingStore } from "./redux/app/trainBookingStore";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import MainRoutes from "./MainRoutes";
const App = () => {
  const mainContext = useMain();
  const persistor = persistStore(trainBookingStore);
  return (
    <div className="App">
      <AdminProvider>
        <Provider store={trainBookingStore}>
          <PersistGate persistor={persistor}>
            <MainRoutes />
          </PersistGate>
        </Provider>
      </AdminProvider>
      {mainContext.myAlertBox.visible && (
        <Alert
          type={mainContext.myAlertBox.type}
          message={mainContext.myAlertBox.message}
          closeButton={mainContext.myAlertBox.closeBtn}
          setShowAlert={mainContext.handleSetMyAlertBox}
        />
      )}
      {mainContext.loadingSpinner && <LoadingSpinner />}
    </div>
  );
};

export default App;
