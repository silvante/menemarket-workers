import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// Components
import Header from "@/components/Header";
import MainLayoutTabs from "@/components/MainLayoutTabs";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/features/userSlice";
import PageLoader from "@/components/PageLoader";
import authService from "@/api/services/authService";

const MainLayout = () => {
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Load user profile
  const LoadUserProfile = useCallback(async () => {
    setLoader(true);
    try {
      const data = await authService.getUserProfile();
      dispatch(updateUser(data));
    } catch (error) {
      notification.error("Server tomonidan hato");
    } finally {
      setLoader(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) LoadUserProfile();
  }, [token, LoadUserProfile]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex flex-col grow py-14">
        {!loader ? <Outlet /> : <PageLoader />}
      </main>

      {/* Nav tabs */}
      <MainLayoutTabs />
    </div>
  );
};

export default MainLayout;
