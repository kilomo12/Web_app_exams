/**
 * @typedef {Object} CourseDocument
 * @property {string} title
 * @property {string} url
 * @property {'pdf'|'word'|'image'|'other'} type
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
 * @typedef {'session_1'|'session_2'|'rattrapage'} SessionKey
 */

/**
 * @typedef {Object} ExamSession
 * @property {SessionKey} key
 * @property {string} date
 * @property {string} room
 */

/**
 * @typedef {Object} Exam
 * @property {string} _id
 * @property {Course} course
 * @property {ExamSession[]} sessions
 */
