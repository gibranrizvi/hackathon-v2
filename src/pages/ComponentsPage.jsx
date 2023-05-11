import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ComponentsPage = ({ userAuthState }) => {
  const navigate = useNavigate();

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
      <h1 className="p-2 text-3xl font-semibold">Components</h1>
    </div>
  );
};

export default ComponentsPage;
