import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileFetcher = () => {
  const userData = useSelector((state) => state.user.data);
  if (!userData) {
    return <div className="py-8 text-center">Yuklanmoqda...</div>;
  }

  const avatar = userData.avatar && userData.avatar.small;
  return (
    <Link to={"/profile"} className="cursor-pointer h-full">
      <div className="flex items-center gap-3 h-full pl-5 border-l">
        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border flex justify-center items-center">
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
        <div className="hidden sm:block">
          <p className="font-semibold">{userData.name}</p>
          <p className="text-gray-500">{userData.email}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProfileFetcher;
