const validator = require('validator');
const getNotes = require('./notes.js');

const notesMessage = getNotes();

console.log(notesMessage);

console.log(validator.isEmail('nick@example.com'));