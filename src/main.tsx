import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import "./app.css";
import Home from "./routes/home";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
