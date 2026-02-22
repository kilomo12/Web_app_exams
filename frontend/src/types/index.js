/**
 * @typedef {Object} CourseDocument
 * @property {string} title
 * @property {string} url
 * @property {'pdf'|'image'|'other'} type
 */

/**
 * @typedef {Object} Course
 * @property {string} _id
 * @property {string} name
 * @property {string} professor
 * @property {number} ects
 * @property {CourseDocument[]} documents
 */

/**
 * @typedef {Object} Exam
 * @property {string} _id
 * @property {Course} course
 * @property {'session_1'|'rattrapage'} session
 * @property {string} date
 * @property {string} room
 */
