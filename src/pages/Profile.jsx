import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Toaster (For notification)
import { notification } from "../notification";

// Services
import authService from "@/api/services/authService";

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }

  if (token) {
    useEffect(() => {
      const LoadUserProfile = async () => {
        setLoading(true)
        authService
          .getUserProfile()
          .then((data) => {
            setUserProfile(data);
          })
          .catch(() => notification.error("Server tomonidan hato"))
          .finally(() => setLoading(false));
      };
      LoadUserProfile()
    }, []);
  }

  const handleLogout = () => {
    notification.promise(
      authService.logout().then(() => {
        navigate("/login");
        localStorage.removeItem("token");
      }),
      {
        success: "Akkuntdan chiqildi",
        loading: "Akkauntdan chiqilmoqda",
        error: "Akkauntdan chiqishda xatolik",
      }
    );
  };

  return (
    <div className="py-8">
      <div className="container">
        <h1>Hello, {userProfile.name}</h1>
        <button
          onClick={handleLogout}
          className="text-primary-default text-lg font-medium underline underline-offset-2"
        >
          Akkauntdan chiqish
        </button>
      </div>
    </div>
  );
};

export default Profile;
