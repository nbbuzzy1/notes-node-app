const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes...';

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.title === title);
    console.log(duplicateNotes);

    if (!duplicateNotes.length) {
        notes.push({
            title,
            body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const removeNote = (removedNoteTitle) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== removedNoteTitle);
    notes.length === notesToKeep.length ? console.log(chalk.red.inverse('No note found!')) : console.log(chalk.green.inverse('Note removed!'));
    saveNotes(notesToKeep);
}

module.exports = {
    getNotes, 
    addNote,
    removeNote
};