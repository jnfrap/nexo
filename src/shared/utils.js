import { backgroundImages } from './constants.js';


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
 * Gets a random background image from the predefined list of background images.
 * @returns {string} A random background image URL.
 */
export function getRandomBackgroundImage() {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  const randomImage = backgroundImages[randomIndex];
  return randomImage;
}
