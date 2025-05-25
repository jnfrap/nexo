/**
 * Recieves a list of boards and sorts them based on the following criteria:
 * 1. Favorite boards are always at the top
 * 2. Non-favorite boards are sorted by their creation date, with the most recent ones first
 * @param {Object[]} boards Boards to be sorted
 * @returns {Object[]} Sorted boards
 * @example
 * const boards = [
 *  { id: 1, title: 'Board 1', isFavorite: false, createdAt: '2023-01-01' },
 *  { id: 2, title: 'Board 2', isFavorite: true, createdAt: '2023-02-01' },
 *  { id: 3, title: 'Board 3', isFavorite: false, createdAt: '2023-03-01' }
 * ]
 * const sortedBoards = reorderBoarsdArray(boards);
 * console.log(sortedBoards);
 * // Output:
 * // [
 * //   { id: 2, title: 'Board 2', isFavorite: true, createdAt: '2023-02-01' },
 * //   { id: 3, title: 'Board 3', isFavorite: false, createdAt: '2023-03-01' },
 * //   { id: 1, title: 'Board 1', isFavorite: false, createdAt: '2023-01-01' }
 * // ]
 */
export function reorderBoarsdArray(boards) {
  boards.sort((a, b) => {
    if (b.isFavorite === true && a.isFavorite !== true) return 1;
    if (a.isFavorite === true && b.isFavorite !== true) return -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return boards;
}

/**
 * Updates a single board in local storage.
 * @param {Object} board - The board object to update.
 *
 * @throws Will throw an error if the board is not found in local storage.
 * @throws Will throw an error if the board is not an object.
 * @throws Will throw an error if the board does not have an id.
 * @throws Will throw an error if the boards in local storage is not an array.
 * @throws Will throw an error if the boards in local storage is empty.
 *
 * @example
 * const board = {
 *   id: '123',
 *   title: 'Updated Board',
 *   isFavorite: true,
 *   createdAt: '2023-01-01',
 *   tasks: []
 * };
 * updateBoardToLocalStorage(board);
 * // This will update the board with id '123' in local storage.
 */
export function updateBoardInLocalStorage(board) {
  if (!board) throw new Error('Board is required');
  if (!board.id) throw new Error('Board id is required');

  const boards = JSON.parse(localStorage.getItem('boards')) || [];

  if (!Array.isArray(boards)) throw new Error('Boards is not an array');
  if (boards.length === 0) throw new Error('Boards is empty');

  const boardIndex = boards.findIndex((b) => b.id === board.id);

  if (boardIndex === -1) throw new Error('Board not found');

  const updatedBoards = boards.map((b) => (b.id === board.id ? board : b));
  localStorage.setItem('boards', JSON.stringify(updatedBoards));
}

/** 
 * Saves a board to the recent boards list in local storage.
 * If the board already exists in the list, it will be moved to the top.
 * If the list exceeds the maximum number of items, the oldest item will be removed.
 * @param {Object} board - The board object to save to recents.
 * @property {string} board.id - The unique identifier of the board.
 * @property {string} board.name - The name of the board.
 * @property {string} [board.icon] - The icon of the board (optional).
 * @example 
 * saveToRecents({ id: '123', name: 'My Board', icon: 'pi pi-table' });
 * // This will save the board to the recent boards list in local storage.
*/

import { key, maxItems } from './constants.js';

export function saveToRecentsBoards(board) {

  let recents = JSON.parse(localStorage.getItem(key)) || [];

  recents = recents.filter(item => item.id !== board.id);

  recents.unshift({
    id: board.id,
    name: board.name,
    icon: board.icon || 'pi pi-table',
    timestamp: Date.now()
  });

  if (recents.length > maxItems) recents = recents.slice(0, maxItems);

  localStorage.setItem(key, JSON.stringify(recents));
}

export function getRecentsBoards() {
  return JSON.parse(localStorage.getItem(key)) || []
}

/**
 * Removes a board from the recent boards list in local storage.
 * @param {string} boardId - The unique identifier of the board to remove.
 * @example
 * removeFromRecents('123');
 * // This will remove the board with id '123' from the recent boards list in local storage.
 */
export function removeFromRecentsBoards(boardId) {
  let recents = JSON.parse(localStorage.getItem(key)) || [];
  recents = recents.filter(item => item.id !== boardId);
  localStorage.setItem(key, JSON.stringify(recents));
}


import mitt from 'mitt';
export default mitt();
/**
 * Creates a new event emitter instance using mitt.
 * This can be used to handle custom events in the application.
 * @returns {Object} An event emitter instance.
 * @example
 * const emitter = createEventEmitter();
 * emitter.on('eventName', (data) => {
 *   console.log(data);
 * });
 * emitter.emit('eventName', { key: 'value' });
 */