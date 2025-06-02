import { db } from "@/firebase/config";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { ErrorCodes } from "../enums";

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
 * Retrieves all boards from the Firestore database.
 * @returns {Array} A promise that resolves to an array of board objects.
 * @throws Will throw an error if no boards are found.
 */
export async function getBoards() {
  const boardsCollection = collection(db, "boards");
  const boardsSnapshot = await getDocs(boardsCollection);
  const boardsList = boardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  if (boardsList.length === 0) {
    const error = Error("No boards found");
    error.code = ErrorCodes.NOT_FOUND;
    throw error;
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
