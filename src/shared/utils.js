import { backgroundImages } from './constants.js';
import { Severity } from './enums.js';


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

/**
 * Reorders an array of tasks based on their order property.
 * @param {Object[]} tasks Array of tasks to be reordered
 * @returns {Object[]} Reordered array of tasks
 */
export function reorderTasksArray(tasks) {
  return tasks.slice().sort((a, b) => a.order - b.order);
}

/**
 * Reorders an array of task groups based on their order property.
 * @param {Object[]} taskGroups Array of task groups to be reordered
 * @returns {Object[]} Reordered array of task groups
 */
export function reorderTaskGroupsArray(taskGroups) {
  return taskGroups.slice().sort((a, b) => a.order - b.order);
}

export function getSeverityIcon(severity) {
  switch (severity) {
    case Severity.LOW: return 'pi pi-info-circle';
    case Severity.MEDIUM: return 'pi pi-exclamation-triangle';
    case Severity.HIGH: return 'pi pi-times';
    default: return '';
  }
}

export function getSeverityStyle(severity) {
  switch (severity) {
    case Severity.LOW: return 'info';
    case Severity.MEDIUM: return 'warn';
    case Severity.HIGH: return 'danger';
    default: return '';
  }
}

export function getSeverityLabel(severity) {
  switch (severity) {
    case Severity.LOW: return 'Low';
    case Severity.MEDIUM: return 'Medium';
    case Severity.HIGH: return 'High';
    default: return '';
  }
}