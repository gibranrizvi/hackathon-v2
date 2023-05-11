import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  PuzzlePieceIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useRecoilValue } from "recoil";

import { userAuthAtom } from "../atoms/authAtom";

const BottomNavBar = () => {
  const { pathname } = useLocation();

  const userAuthState = useRecoilValue(userAuthAtom);

  return (
    <div className="btm-nav btm-nav-sm">
      <Link
        to="/"
        className={`${pathname === "/" ? "active" : ""}`}
      >
        <button className="btn btn-sm btn-ghost btn-circle">
          <HomeIcon className="icon-btn-xs" />
        </button>
      </Link>
      <Link
        to="/components"
        className={`${pathname === "/components" ? "active" : ""}`}
      >
        <button className="btn btn-sm btn-ghost btn-circle">
          <PuzzlePieceIcon className="icon-btn-xs" />
        </button>
      </Link>
      <Link
        to="/profile"
        className={`${pathname === "/profile" ? "active" : ""}`}
      >
        {userAuthState?.currentUser?.photoURL ? (
          <div className="btn btn-sm btn-ghost btn-circle avatar">
            <img
              src={userAuthState?.currentUser?.photoURL}
              alt="profile"
              referrerPolicy="no-referrer"
              className="rounded-full"
            />
          </div>
        ) : (
          <button className="btn btn-sm btn-ghost btn-circle">
            <UserIcon className="icon-btn-xs" />
          </button>
        )}
      </Link>
    </div>
  );
};

export default BottomNavBar;
