import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

// import GoogleSignInButton from "../components/GoogleSignInButton";

import useAuth from "../hooks/useAuth";

function LoginPage({ userAuthState }) {
  const navigate = useNavigate();
  const { signInWithEmailPassword, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loggedIn } = userAuthState;

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  return (
    <div className="h-screen flex flex-col space-y-8 justify-center items-center w-[80vw] mx-auto">
      <img
        src={logo}
        className="w-24 h-24"
        alt="logo"
      />

      <form
        onSubmit={e => {
          e.preventDefault();
          return signInWithEmailPassword(email, password);
        }}
      >
        <div className="flex flex-col space-y-2 justify-center min-w-[80vw]">
          <div className="form-control w-full">
            <input
              type="email"
              placeholder="Email"
              className="input input-md input-bordered w-full"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control w-full">
            <input
              type="password"
              placeholder="Password"
              className="input input-md input-bordered w-full"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn shadow-xl w-full"
          >
            Sign in
          </button>
        </div>
      </form>

      <p>
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-primary"
        >
          Sign up
        </Link>
      </p>

      <div className="divider">OR</div>

      {/* <GoogleSignInButton /> */}
      <button
        onClick={signInWithGoogle}
        className="btn btn-ghost min-w-[80vw] shadow-xl text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
      >
        <>
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          <p>Continue with Google</p>
        </>
      </button>
    </div>
  );
}

export default LoginPage;
