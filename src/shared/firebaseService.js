import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from '@/firebase/config';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";


/**
 * Login function to authenticate a user with email and password and saves it on local storage.
 * @param {*} email The user's email address.
 * @param {*} password The user's password.
 * @throws Will throw an error if email or password is not provided.
 * @returns {Object} A promise that resolves to the user object if login is successful.
 */
export async function login(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required for login");
  }
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
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
 * @returns {Object} A promise that resolves to the auth object if logout is successful.
 * @throws Will throw an error if logout fails.
 */
export async function logout() {
  const auth = getAuth();
  return signOut(auth).then(() => {
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
 * @returns {Object} A promise that resolves to the user object if registration is successful.
 * @throws Will throw an error if email or password is not provided.
 */
export async function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    })
    .catch((error) => {
      throw new Error("Registration failed: " + error.message);
    });
}

/**
 * Save a new board to the Firestore database.
 * @param {Object} board The board object to save.
 * @returns {Promise} A promise that resolves to the document reference of the saved board.
 * @throws Will throw an error if the board is not provided or if saving fails.
 * @throws Will throw an error if the board is not provided.
 */
export async function saveBoard(board) {
  if (!board) {
    throw new Error("Board is required to save");
  }
  return await addDoc(collection(db, "boards"), board);
}

/**
 * Updates an existing board in the Firestore database.
 * @param {Object} board The board object to update, which must include an id.
 * @returns {Promise} A promise that resolves when the board is updated.
 * @throws Will throw an error if the board or board id is not provided.
 * @throws Will throw an error if the update fails.
 */
export async function updateBoard(board) {
  if (!board || !board.id) {
    throw new Error("Board and board id are required to update");
  }

  const boardRef = doc(db, "boards", board.id);
  return await updateDoc(boardRef, board);
}

/**
 * Updates a task group in Firestore.
 * @param {String} boardID - The ID of the board containing the task group.
 * @param {String} taskGroupId - The ID of the task group to update.
 * @param {Object} updatedData - Los datos a actualizar en el task group.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el grupo se ha actualizado.
 * @throws {Error} Si falta algún parámetro.
 */
export async function updateTaskGroup(boardID, taskGroupId, updatedData) {
  if (!boardID || !taskGroupId) {
    throw new Error("Board ID y Task Group ID son requeridos para actualizar");
  }
  const taskGroupRef = doc(db, "boards", boardID, "taskGroups", taskGroupId);
  return await updateDoc(taskGroupRef, updatedData);
}

/**
 * Retrieves a board by its ID from the Firestore database.
 * @param {String} boardId The ID of the board to retrieve.
 * @returns {Object} A promise that resolves to the board object if found.
 * @throws Will throw an error if the board ID is not provided or if the board is not found.
 * @throws Will throw an error if the board is not found.
 */
export async function getBoardByID(boardId) {
  if (!boardId) {
    throw new Error("Board ID is required to get the board");
  }

  const boardRef = doc(db, "boards", boardId);
  const boardSnapshot = await getDoc(boardRef);

  if (!boardSnapshot.exists()) {
    throw new Error("Board not found");
  }

  return { id: boardSnapshot.id, ...boardSnapshot.data() };
}

/**
 * Retrieves all task groups from a specific board by its ID.
 * @param {String} boardId - The ID of the board whose task groups are to be retrieved.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of task group objects, each containing its id and data.
 * @throws Will throw an error if the board ID is not provided or if the retrieval fails.
 */
export async function getTaskGroupFromBoardId(boardId) {
  const taskGroupsRef = collection(db, 'boards', boardId, 'taskGroups');
  const querySnapshot = await getDocs(taskGroupsRef);
  let taskGroups = [];
  querySnapshot.forEach((doc) => {
    taskGroups.push({ id: doc.id, ...doc.data() });
  });
  return taskGroups;
}


/**
 * Save taskGroup on firebase
 * @param {String} boardID - The ID of the board containing the task group.
 * @param {Object} taskGroup - The task group to add.
 * @returns {Promise<Object>} A promise that resolves to an object with the added task group. 
 */
export async function saveTaskGroup(boardID, taskGroup) {
  if (!boardID) {
    throw new Error("Board id is required to save");
  }
  const docRef = await addDoc(collection(db, "boards", boardID, "taskGroups"), taskGroup);
  return { id: docRef.id, ...taskGroup };
}


/**
 * Retrieves all tasks from a specific task group within a board from Firestore.
 *
 * @async
 * @param {String} taskGroupId - The ID of the task group to retrieve tasks from.
 * @param {String} boardId - The ID of the board containing the task group.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of task objects, each including its Firestore document ID and data.
 */
export async function getTasksByGroupId(taskGroupId, boardId) {
  const taskRef = collection(db, 'boards', boardId, 'taskGroups', taskGroupId, 'tasks');
  const querySnapshot = await getDocs(taskRef);
  let tasks = [];
  querySnapshot.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });
  return tasks;
}

/**
 * Retrieves all boards from the Firestore database.
 * @returns {Array} A promise that resolves to an array of board objects.
 * @throws Will throw an error if no boards are found.
 */
export async function getBoards() {
  const boardsCollection = collection(db, "boards");
  const boardsSnapshot = await getDocs(boardsCollection);
  const boardsList = boardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  if (boardsList.length === 0) {
    throw new Error("No boards found");
  }

  return boardsList;
}

/**
 * Deletes a board from the Firestore database by its ID.
 * @param {String} boardId The ID of the board to delete.
 * @returns {Promise} A promise that resolves when the board is deleted.
 * @throws Will throw an error if the board ID is not provided or if the deletion fails.
 */
export async function deleteBoard(boardId) {
  if (!boardId) {
    throw new Error("Board ID is required to delete the board");
  }

  const boardRef = doc(db, "boards", boardId);
  return await deleteDoc(boardRef);
}

/**
 * Deletes a task group from a specific board in Firestore.
 *
 * @async
 * @param {string} boardID - The ID of the board containing the task group.
 * @param {string} taskGroupId - The ID of the task group to delete.
 * @returns {Promise<void>} A promise that resolves when the task group is deleted.
 * @throws {Error} If the boardID is not provided.
 */
export async function deleteTaskGroup(boardID, taskGroupId) {
  if (!boardID) {
    throw new Error("Board id is required to delete");
  }
return await deleteDoc(doc(db, "boards", boardID, "taskGroups", taskGroupId));
}