import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { notification } from "../notification";
import authService from "@/api/services/authService";
import UserSettings from "@/components/UserSettings";

const Profile = ({ setLoader }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);

  // Prevent crash if userData is null
  if (!userData) {
    return (
      <div className="py-8 text-center">
        <p className="text-lg text-gray-600">Yuklanmoqda...</p>
      </div>
    );
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
        <h1 className="text-2xl mb-5">Ishchi hisobi ma'lumotlari</h1>
        <div className="w-full flex justify-between items-start gap-5">
          <div className="w-96 bg-white p-5 border rounded-3xl">
            <div className="overflow-hidden rounded-full h-56 w-56 my-5 mx-auto bg-gray-300">
              {userData?.avatar?.original ? (
                <Link to="/settings" className="w-full h-full">
                  <img
                    src={userData.avatar.original}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
              ) : (
                <Link to="/settings">
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="bx bx-user-circle text-8xl text-gray-500"></i>
                  </div>
                </Link>
              )}
            </div>
            <div className="w-full text-center">
              <h3 className="font-semibold text-2xl w-full truncate">
                {userData.name}
              </h3>
              <p>
                <span className="font-semibold">Ishchi statusi: </span>
                {userData.status}
              </p>
              <p>
                <span className="font-semibold">@{userData.username}</span>
              </p>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white py-2 px-5 mx-auto my-5 rounded-md"
              >
                Hisobni tark etish
              </button>
            </div>
          </div>
          <UserSettings userData={userData} setLoader={setLoader} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
