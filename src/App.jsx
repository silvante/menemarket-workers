import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Toaster (For notification)
import { Toaster } from "react-hot-toast";

// Layouts
import MainLayout from "./layouts/MainLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Page404 />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );

  return (
    <>
      {/* Router */}
      <RouterProvider router={router} />

      {/* Toaster */}
      <Toaster />
    </>
  );
};

export default App;
