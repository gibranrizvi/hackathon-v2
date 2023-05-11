import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";

import { usersAtom } from "../atoms/usersAtom";
import { groups } from "../static";

const useUsers = () => {
  const [users, setUsers] = useRecoilState(usersAtom);

  const [submitting, setSubmitting] = useState(false);

  //************* */
  const getUsers = useCallback(async () => {
    // const fetchedUsers = await httpGetUsers();
    // if (fetchedUsers) {
    //   setSubmitting(false);
    //   return setUsers(fetchedUsers);
    // }
  }, []);

  //************* */
  const getUserByUID = useCallback(async uid => {
    // const response = await httpGetUserByUID(uid);
    // return response;
  }, []);

  //************* */
  const createUser = useCallback(
    async user => {
      // if (submitting) return;
      // setSubmitting(true);
      // const response = await httpCreateUser(user);
      // const success = response.statusText === "OK";
      // if (success) {
      //   getUsers();
      //   return { ok: true };
      // }
      // setSubmitting(false);
      // return { ok: false };
    },

    [getUsers]
  );

  //************* */
  const updateUser = useCallback(
    async user => {
      // if (submitting) return;
      // setSubmitting(true);
      // const response = await httpUpdateUser(user);
      // const success = response.statusText === "OK";
      // if (success) {
      //   return await getUsers();
      // }
    },
    [getUsers]
  );

  //************* */
  const formatUser = useCallback(user => {
    return {
      uid: user.uid,
      name: user.displayName,
      username: user.email.split("@")[0],
      email: user.email,
      roles: [],
      groups: [],
      metadata: user.metadata,
      photoURL: user.photoURL,
      accessToken: user.accessToken,
    };
  }, []);

  //************* */
  const getFilteredUserResults = searchTerm => {
    if (!searchTerm) return users;

    const results = users.filter(
      user =>
        user.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return results;
  };

  //************* */
  const getFilteredGroupResults = searchTerm => {
    if (!searchTerm) return groups;

    const results = groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return results;
  };

  return {
    submitting,
    getUsers,
    getUserByUID,
    createUser,
    updateUser,
    formatUser,
    getFilteredUserResults,
    getFilteredGroupResults,
  };
};

export default useUsers;
