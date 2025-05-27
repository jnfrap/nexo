import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '@/firebase/config';

/**
 * Login function to authenticate a user with email and password and saves it on local storage.
 * @param {*} email The user's email address.
 * @param {*} password The user's password.
 * @throws Will throw an error if email or password is not provided.
 * @returns {Promise<Object>} A promise that resolves to the user object if login is successful.
 */
export function login(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required for login");
  }
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    })
    .catch((error) => {
      throw new Error("Login failed: " + error.message);
    });
}

/**
 * Logout function to sign out the user and remove user data from local storage.
 * @returns {Promise<Object>} A promise that resolves to the auth object if logout is successful.
 * @throws Will throw an error if logout fails.
 */
export function logout() {
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log("User signed out successfully");
    localStorage.removeItem('user');
    return auth;
  }).catch((error) => {
    throw new Error("Logout failed: " + error.message);
  });
}

/**
 * Register function to create a new user with email and password.
 * @param {*} email User's email address.
 * @param {*} password User's password.
 * @returns {Promise<Object>} A promise that resolves to the user object if registration is successful.
 * @throws Will throw an error if email or password is not provided.
 */
export function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    })
    .catch((error) => {
      throw new Error("Registration failed: " + error.message);
    });
}
