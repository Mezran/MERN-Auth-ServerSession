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
// redux
import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedPage from "./components/protectedPage/ProtectedPage";
import PageUserLogin from "./pages/user/login/PageUserLogin";
import PageUserProfile from "./pages/user/profile/PageUserProfile";
import Popup from "./components/popup/Popup";

function App() {
  return (
    <>
      <Provider store={store}>
        <CssBaseline />
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Header />
            <Routes>
              <Route path="/" element={<h1>Home Page</h1>} />
              <Route path="/user/register" element={<PageUserRegister />} />
              <Route path="/user/login" element={<PageUserLogin />} />
              <Route element={<ProtectedPage />}>
                <Route path="/dashboard" element={<h1>Dashboard Page</h1>} />
                <Route path="/user/profile" element={<PageUserProfile />} />
              </Route>
              <Route path="/*" element={<h1>Not Found</h1>} />
            </Routes>
            <Popup />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
