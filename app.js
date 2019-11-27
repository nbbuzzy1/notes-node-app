const chalk = require('chalk');
 
const getNotes = require('./notes.js');

const notesMessage = getNotes();

console.log(chalk.red.inverse('Error!'));
console.log(notesMessage);