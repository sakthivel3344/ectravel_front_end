import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { MainProvider } from "./contexts/MainContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <MainProvider>
      <App />
    </MainProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
