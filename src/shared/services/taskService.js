import { db } from "@/firebase/config";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";

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
 * Save an especific task on firebase.
 * @param {String} boardID - Board ID.
 * @param {String} taskGroupId - Task Group ID.
 * @param {Object} task - Task object to save.
 * @returns {Promise<Object>} - Task save it with his id.
 */
export async function saveTask(boardID, taskGroupId, task) {
  if (!boardID || !taskGroupId) {
    throw new Error("Board ID and Task Group ID is required");
  }
  const docRef = await addDoc(collection(db, "boards", boardID, "taskGroups", taskGroupId, "tasks"), task);
  return { id: docRef.id, ...task};
}

/**
 * Deletes a task from a specific task group in Firestore.
 *
 * @async
 * @param {string} boardID - The ID of the board containing the task group.
 * @param {string} taskGroupId - The ID of the task group containing the task.
 * @param {string} taskId - The ID of the task to delete.
 * @returns {Promise<void>} A promise that resolves when the task is deleted.
 * @throws {Error} If any parameter is not provided.
 */
export async function deleteTask(boardID, taskGroupId, taskId) {
  if (!boardID || !taskGroupId || !taskId) {
    throw new Error("Board ID, Task Group ID, and Task ID are required to delete the task");
  }
  return await deleteDoc(doc(db, "boards", boardID, "taskGroups", taskGroupId, "tasks", taskId));
}
