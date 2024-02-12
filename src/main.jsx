import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import UserContextProvider  from './context/userContextProvider.jsx'
import { ThemeProvider } from "@material-tailwind/react";
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <UserContextProvider>

    <ThemeProvider>
      <App />
    </ThemeProvider>
</UserContextProvider>
  </React.StrictMode>
);