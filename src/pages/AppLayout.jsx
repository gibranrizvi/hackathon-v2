import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userAuthAtom } from "../atoms/authAtom";
import { showNavbarAtom } from "../atoms/navbarAtom";

import useAuth from "../hooks/useAuth";

import RootLayout from "../components/RootLayout";
import DashboardPage from "./DashboardPage";
import UsersPage from "./UsersPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Spinner from "../components/Spinner";
import ProfilePage from "./ProfilePage";
import ComponentsPage from "./ComponentsPage";

const AppLayout = () => {
  const userAuthState = useRecoilValue(userAuthAtom);
  const showNavbar = useRecoilValue(showNavbarAtom);

  const { getAuthState } = useAuth();

  console.log(userAuthState);

  useEffect(() => {
    getAuthState();
  }, []);

  if (!userAuthState) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner lg />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      {showNavbar && userAuthState.loggedIn ? <RootLayout /> : null}

      {/* Routes */}
      <Routes>
        <Route
          exact
          path="/"
          element={<DashboardPage userAuthState={userAuthState} />}
        />
        <Route
          exact
          path="/components"
          element={<ComponentsPage userAuthState={userAuthState} />}
        />
        <Route
          exact
          path="/profile"
          element={<ProfilePage userAuthState={userAuthState} />}
        />
        <Route
          exact
          path="/users"
          element={<UsersPage userAuthState={userAuthState} />}
        />
        <Route
          exact
          path="/login"
          element={<LoginPage userAuthState={userAuthState} />}
        />
        <Route
          exact
          path="/register"
          element={<RegisterPage userAuthState={userAuthState} />}
        />
      </Routes>
      {/* Footer */}
    </div>
  );
};

export default AppLayout;
