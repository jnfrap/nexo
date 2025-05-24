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

export function saveToRecents(board) {
  const maxItems = 5;
  const key = 'recentBoards';

  // Obtiene los actuales
  let recents = JSON.parse(localStorage.getItem(key)) || [];

  // Elimina si ya existe
  recents = recents.filter(item => item.id !== board.id);

  // Añade al inicio
  recents.unshift({
    id: board.id,
    name: board.name, // o cualquier info básica que necesites
    timestamp: Date.now()
  });

  // Limita a 5
  if (recents.length > maxItems) recents = recents.slice(0, maxItems);

  localStorage.setItem(key, JSON.stringify(recents));
}
