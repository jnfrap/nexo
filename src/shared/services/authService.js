import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { ErrorCodes } from "../enums";

/**
 * Login function to authenticate a user with email and password and saves it on local storage.
 * @param {*} email The user's email address.
 * @param {*} password The user's password.
 * @throws Will throw an error if email or password is not provided.
 * @returns {Object} A promise that resolves to the user object if login is successful.
 */
export async function login(email, password) {
  if (!email || !password) {
    const error = Error("Email and password are required for login");
    error.code = ErrorCodes.BAD_REQUEST;
  }
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      throw error.code;
    });
}

/**
 * Logout function to sign out the user and remove user data from local storage.
 * @returns {Object} A promise that resolves to the auth object if logout is successful.
 * @throws Will throw an error if logout fails.
 */
export async function logout() {
  const auth = getAuth();
  return signOut(auth).then(() => {
    console.log("User signed out successfully");
    return auth;
  }).catch((error) => {
    const custumError = new Error("Logout failed: " + error.message);
    custumError.code = ErrorCodes.AUTHENTICATION_FAILED;
    throw custumError;
  });
}

/**
 * Register function to create a new user with email and password.
 * @param {*} email User's email address.
 * @param {*} password User's password.
 * @returns {Object} A promise that resolves to the user object if registration is successful.
 * @throws Will throw an error if email or password is not provided.
 */
export async function register(email, password, displayName) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      return user;
    })
    .catch((error) => {
      throw error;
    });
}
