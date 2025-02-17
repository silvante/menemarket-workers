import authService from "@/api/services/authService";
import ordersService from "@/api/services/ordersService";
import { notification } from "@/notification";
import { updateOrders } from "@/store/features/ordersSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ProfileFetcherCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const userData = useSelector((state) => state.user.data);
  if (!userData) {
    return <div className="py-8 text-center">Yuklanmoqda...</div>;
  }
  const avatar = userData.avatar && userData.avatar.small;

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

  const LoadOrdersByStatus = async () => {
    try {
      setLoader(true);
      const data = await ordersService.getOrders();
      dispatch(updateOrders(data));
      setLoader(false);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    LoadOrdersByStatus();
  }, [LoadOrdersByStatus]);

  const orders = useSelector((state) => state.orders.data);
  const order_length = orders.length;

  return (
    <div className="w-96 bg-white border rounded-3xl sticky top-20 overflow-hidden">
      <div className="w-full flex gap-5 items-center border-b p-5">
        <div className="w-14 h-14 border rounded-full overflow-hidden bg-gray-200 flex justify-center items-center">
          {avatar ? (
            <img
              src={avatar}
              alt="Your profile picture"
              className="w-full h-full aspect-square object-cover"
            />
          ) : (
            <i className="bx bx-user-circle text-gray-400 text-3xl"></i>
          )}
        </div>
        <div>
          <p className="font-semibold">{userData.name}</p>
          <p>
            <span></span>@{userData.username}
          </p>
        </div>
      </div>
      <p className="py-3 px-5 border-b">
        <span className="font-semibold">sizning kasbingiz: </span>
        {userData.status}
      </p>
      <div className="w-full border-b">
        <ul>
          <li>
            <Link
              to={"/profile"}
              className="px-5 py-3 flex hover:bg-slate-100 transition-all"
            >
              <p className="font-semibold">Profil</p>
            </Link>
            <Link
              to={"/orders"}
              className="px-5 py-3 flex hover:bg-slate-100 transition-all justify-between items-center"
            >
              <p className="font-semibold">Buyurtmalar</p>
              <p className="bg-primary-default px-3 rounded-full font-semibold text-white">
                {loader ? "Yuklanmoqda..." : order_length}
              </p>
            </Link>
            <Link
              to={"/settings"}
              className="px-5 py-3 flex hover:bg-slate-100 transition-all"
            >
              <p className="font-semibold">Sozlamalar</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-5 w-full">
        <button
          onClick={handleLogout}
          className="font-medium text-primary-default"
        >
          <i className="bx bx-log-out"></i> Hisobni tark etish
        </button>
      </div>
    </div>
  );
};

export default ProfileFetcherCard;
