/**
 * @typedef {Object} Course
 * @property {string} _id
 * @property {string} name
 * @property {string} professor
 * @property {number} ects
 */

/**
 * @typedef {Object} Exam
 * @property {string} _id
 * @property {Course} course
 * @property {'session_1'|'rattrapage'} session
 * @property {string} date
 * @property {string} room
 */
