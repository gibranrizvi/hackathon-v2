import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProfilePage = ({ userAuthState }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { loggedIn, currentUser } = userAuthState;

  const me = currentUser?._id;

  //********** reroute to login page if user is not authenticated */
  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    }
  }, [loggedIn]);

  return (
    <div className="flex flex-col space-y-2 p-2">
      <h1 className="p-2 text-3xl font-semibold">Profile</h1>
      <div className="bg-white cursor-pointer rounded-md">
        <p className="p-2 text-lg font-semibold border-b">Option 1</p>
        <p className="p-2 text-lg font-semibold border-b">Option 2</p>
        <p className="p-2 text-lg font-semibold">Option 3</p>
      </div>
      <div
        className="bg-white cursor-pointer rounded-md"
        onClick={logout}
      >
        <p className="p-2 text-lg font-semibold">Sign out</p>
      </div>
    </div>
  );
};

export default ProfilePage;
