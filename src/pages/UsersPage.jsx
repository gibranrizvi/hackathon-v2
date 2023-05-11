import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import useUsers from "../hooks/useUsers";
import useAuth from "../hooks/useAuth";

import { usersAtom } from "../atoms/usersAtom";

import UsersList from "../components/UsersList";

const UsersPage = ({ userAuthState }) => {
  const { getUsers } = useUsers();
  const { adminCreateNewUser } = useAuth();

  const users = useRecoilValue(usersAtom);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(users);

  const { loggedIn, currentUser } = userAuthState;

  const navigate = useNavigate();

  //************* */
  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    }
    if (!currentUser.user.roles.includes("administrator")) {
      return navigate("/");
    }
  }, [loggedIn]);

  //************* */
  useEffect(() => {
    if (loggedIn) getUsers();
  }, [loggedIn]);

  //************* */
  return (
    <div className="flex flex-col p-2 space-y-2 justify-center lg:w-10/12 mx-auto">
      <form
        onSubmit={async e => {
          e.preventDefault();
          if (loading) return;

          setLoading(true);

          if (confirmPassword !== password) {
            setLoading(false);
            return alert("Confirm password does not match password");
          }

          const response = await adminCreateNewUser(email, password, name);

          if (response.ok) {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setName("");
          }

          return setLoading(false);
        }}
      >
        <div className="flex flex-col space-y-1">
          <div className="form-control w-full">
            <input
              type="email"
              placeholder="Email"
              className="input input-sm input-bordered w-full"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control w-full">
            <input
              type="password"
              placeholder="Password"
              className="input input-sm input-bordered w-full"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="form-control w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-sm input-bordered w-full"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="Name"
              className="input input-sm input-bordered w-full"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-sm"
          >
            {loading ? "Loading..." : "Create user"}
          </button>
        </div>
      </form>
      <hr />
      <div className="flex flex-col space-y-2">
        <UsersList users={users} />
      </div>
    </div>
  );
};

export default UsersPage;
