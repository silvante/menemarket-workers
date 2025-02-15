import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Toaster (For notification)
import { notification } from "../notification";
import PageLoader from "../components/PageLoader";

// Services
import authService from "@/api/services/authService";
import UserSettings from "@/components/UserSettings";

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
        setLoading(true);
        authService
          .getUserProfile()
          .then((data) => {
            setUserProfile(data);
          })
          .catch(() => notification.error("Server tomonidan hato"))
          .finally(() => setLoading(false));
      };
      LoadUserProfile();
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

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-2xl mb-5">Ishchi hisobi malumotlari</h1>
        <div className="w-full flex justify-between items-start gap-5">
          <div className="w-96 bg-white p-5 border rounded-3xl">
            <div className="overflow-hidden rounded-full h-56 w-56 my-5 mx-auto bg-gray-300">
              {userProfile.avatar && userProfile.avatar.original ? (
                <Link to={"/settings"} className="w-full h-full">
                  <img
                    src={userProfile.avatar.original}
                    alt={userProfile.name}
                    className="w-full h-full"
                  />
                </Link>
              ) : (
                <Link to={"/settings"}>
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="bx bx-user-circle text-8xl text-gray-500"></i>
                  </div>
                </Link>
              )}
            </div>
            <div className="w-full text-center">
              <h3 className="font-semibold text-2xl w-full truncate">{userProfile.name}</h3>
              <p>
                <span className="font-semibold">Ishchi statusi: </span>
                {userProfile.status}
              </p>
              <p>
                <span className="font-semibold">@{userProfile.username}</span>
              </p>
              <button
                onClick={handleLogout}
                className="btn-primary py-2 px-5 mx-auto my-5"
              >
                Hisobni tark etish
              </button>
            </div>
          </div>
          <UserSettings userProfile={userProfile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
