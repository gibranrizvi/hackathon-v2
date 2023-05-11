import { useCallback } from "react";
import { useRecoilState } from "recoil";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getDoc,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import { auth, db, storage } from "../firebase";
import { userAuthAtom } from "../atoms/authAtom";

import useUsers from "./useUsers";

const useAuth = () => {
  const { createUser, updateUser, formatUser, getUserByUID } = useUsers();

  const [userAuthState, setUserAuthState] = useRecoilState(userAuthAtom);

  //************* */
  const getAuthState = useCallback(
    () =>
      onAuthStateChanged(auth, async user => {
        // if user is logged in
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          // save loggedIn state and currentUser state to Recoil if user is authenticated
          return setUserAuthState({
            ...userAuthState,
            currentUser: userSnap.data(),
            loggedIn: true,
          });
        } else {
          // alter loggedIn state and set currentUser state to null in Recoil if user is not authenticated
          setUserAuthState({
            ...userAuthState,
            currentUser: null,
            loggedIn: false,
          });
        }
      }),
    []
  );

  //************* */
  const signUpWithEmailPassword = async (
    email,
    password,
    displayName,
    photo
  ) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = response.user;

    user.displayName = displayName;
    user.photo = photo;
    user.photoURL =
      "https://cdn0.iconfinder.com/data/icons/robot-avatar/512/Robot_Avatars_19-256.png";
    user.phoneNumber = null;

    return createUserDocument(user);
  };

  //************* */
  const signInWithEmailPassword = useCallback(async (email, password) => {
    let user;
    const response = await signInWithEmailAndPassword(auth, email, password);

    user = response.user;

    // Update user document
    updateUserDocument(user);
  }, []);

  //************* */
  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(response);
    const accessToken = credential.accessToken;

    const uid = response.user.uid;
    const user = { ...response.user, accessToken };

    // write or update user document
    const exists = await userDocExists(uid);

    if (exists) return updateUserDocument(user);
    return createUserDocument(user);
  }, []);

  //************* */
  const userDocExists = async uid => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) return true;
    return false;
  };

  //************* */
  const createUserDocument = async user => {
    // Write user document to database on first log in or registration
    const userData = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      role: "customer",
      log: [],
      accessToken: user.accessToken,
      metadata: {
        createdAt: user.metadata.createdAt,
        creationTime: user.metadata.creationTime,
        lastLoginAt: user.metadata.lastLoginAt,
        lastSignInTime: user.metadata.lastSignInTime,
      },
    };

    console.log(userData);

    try {
      await setDoc(doc(db, "users", user.uid), userData);

      // To keep count of number of users
      await updateDoc(doc(db, "counts", "users"), {
        count: increment(1),
      });

      // For manual photo upload - upload photo to firebase storage
      // then fetch download link
      // then save download link to user's photoURL field
      if (user.photo) {
        const imageRef = ref(
          storage,
          `users/${user.uid}/${user.displayName
            .replace(/\s+/g, "-")
            .toLowerCase()}`
        );

        await uploadString(imageRef, user.photo, "data_url");

        const downloadURL = await getDownloadURL(imageRef);

        console.log(downloadURL);

        await updateDoc(doc(db, "users", user.uid), {
          photoURL: downloadURL,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //************* */
  const updateUserDocument = async user => {
    // Update user document on login
    const userData = {
      accessToken: user.accessToken,
      metadata: {
        createdAt: user.metadata.createdAt,
        creationTime: user.metadata.creationTime,
        lastLoginAt: user.metadata.lastLoginAt,
        lastSignInTime: user.metadata.lastSignInTime,
      },
    };

    try {
      return await updateDoc(doc(db, "users", user.uid), userData);
    } catch (error) {
      console.log({ error });
    }
  };

  //************* */
  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return {
    getAuthState,
    signUpWithEmailPassword,
    signInWithEmailPassword,
    signInWithGoogle,
    logout,
  };
};

export default useAuth;
