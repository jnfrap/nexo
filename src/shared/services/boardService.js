import { db } from "@/firebase/config";
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
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
    const error = Error("Board ID is required to get the board");
    error.code = ErrorCodes.BAD_REQUEST;
    throw error;
  }

  const boardRef = doc(db, "boards", boardId);
  const boardSnapshot = await getDoc(boardRef);

  if (!boardSnapshot.exists()) {
    const error = new Error("Board not found");
    error.code = ErrorCodes.NOT_FOUND;
    throw error;
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
    const error = Error("Board is required to save");
    error.code = ErrorCodes.BAD_REQUEST;
    throw error;
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
    const error = Error("Board and board id are required to update");
    error.code = ErrorCodes.BAD_REQUEST;
    throw error;
  }

  const boardRef = doc(db, "boards", board.id);
  return await updateDoc(boardRef, board);
}

/**
 * Deletes a board from the Firestore database by its ID.
 * @param {String} boardId The ID of the board to delete.
 * @returns {Promise} A promise that resolves when the board is deleted.
 * @throws Will throw an error if the board ID is not provided or if the deletion fails.
 */
export async function deleteBoard(boardId) {
  if (!boardId) {
    const error = Error("Board ID is required to delete the board");
    error.code = ErrorCodes.BAD_REQUEST;
    throw error;
  }

  const boardRef = doc(db, "boards", boardId);
  return await deleteDoc(boardRef);
}
