import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import logo from "../assets/logo.png";

import useAuth from "../hooks/useAuth";
import { userAuthAtom } from "../atoms/authAtom";

function Header() {
  const userAuthState = useRecoilValue(userAuthAtom);
  const { logout } = useAuth();

  const { loggedIn, currentUser } = userAuthState;

  return (
    <div className="fixed px-4 h-12 w-full bg-base-100 shadow-md z-50 flex items-center">
      <div className="w-full lg:w-10/12 flex flex-row justify-between items-center mx-auto">
        {loggedIn ? (
          <Link
            to="/"
            className="flex space-x-2 justify-center items-center"
          >
            <img
              src={logo}
              className="w-6 h-6"
              alt="logo"
            />
          </Link>
        ) : null}
        <div className="flex justify-end space-x-2">
          {loggedIn ? (
            <React.Fragment>
              <Link to="/search">
                <button className="btn btn-sm btn-ghost btn-circle">
                  <MagnifyingGlassIcon className="icon-btn-xs" />
                </button>
              </Link>
            </React.Fragment>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm btn-ghost btn-circle"
            >
              <ArrowLeftOnRectangleIcon className="icon-btn-xs" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
