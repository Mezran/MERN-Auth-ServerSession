import { useState } from "react";
// Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

// React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
// components
import Header from "./components/header/Header";
import PageUserRegister from "./pages/user/register/PageUserRegister";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Header />
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/user/register" element={<PageUserRegister />} />
            <Route path="/dashboard" element={<h1>Dashboard Page</h1>} />
            <Route path="/*" element={<h1>Not Found</h1>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
