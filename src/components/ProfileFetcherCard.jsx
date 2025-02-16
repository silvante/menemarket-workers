import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileFetcherCard = () => {
  const userData = useSelector((state) => state.user.data);
  if (!userData) {
    return <div className="py-8 text-center">Yuklanmoqda...</div>;
  }
  const avatar = userData.avatar && userData.avatar.small;
  return (
    <div className="w-96 bg-white p-5 border rounded-3xl sticky top-20">
      <div className="w-full flex gap-5 items-center">
        <div className="w-14 h-14 border rounded-full overflow-hidden">
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
            <p><span></span>@{userData.username}</p>
        </div>
      </div>
      <p className="my-3"><span className="font-semibold">sizning kasbingiz: </span>{userData.status}</p>
    </div>
  );
};

export default ProfileFetcherCard;
