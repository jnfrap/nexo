import { db } from "@/firebase/config";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { ErrorCodes } from "../enums";

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
    const error = Error("Board ID y Task Group ID son requeridos para actualizar");
    error.code = ErrorCodes.BAD_REQUEST;
    throw error;
  }
  const taskGroupRef = doc(db, "boards", boardID, "taskGroups", taskGroupId);
  return await updateDoc(taskGroupRef, updatedData);
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
  const taskGroups = [];
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
    const error = Error("Board id is required to save");
    error.code = ErrorCodes.BAD_REQUEST;
    throw error;
  }
  const docRef = await addDoc(collection(db, "boards", boardID, "taskGroups"), taskGroup);
  return { id: docRef.id, ...taskGroup };
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
    const error = Error("Board id is required to delete");
    error.code = ErrorCodes.BAD_REQUEST;
    throw error;
  }
return await deleteDoc(doc(db, "boards", boardID, "taskGroups", taskGroupId));
}

export async function deleteAllTaskInGroup(boardID, taskGroupId) {
  if (!boardID || !taskGroupId) {
    const error = Error("Board ID y Task Group ID son requeridos para eliminar");
    error.code = ErrorCodes.BAD_REQUEST;
    throw error;
  }
  const tasksRef = collection(db, "boards", boardID, "taskGroups", taskGroupId, "tasks");
  const tasksSnapshot = await getDocs(tasksRef);
  const deletePromises = tasksSnapshot.docs.map((taskDoc) => deleteDoc(taskDoc.ref));
  await Promise.all(deletePromises);
}
