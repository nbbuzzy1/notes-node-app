const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
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

const listNotes = () => {
    console.log(chalk.blue('Your notes...'))
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(chalk.green(note.title));
    });
}

const readNote = (noteTitle) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === noteTitle);
    console.log(noteToRead);
    if (noteToRead) {
        console.log(chalk.blue(noteToRead.title));
        console.log(chalk.red(noteToRead.body));
    } else {
        console.log(chalk.red.inverse('NO NOTE FOUND'));
    }

}

module.exports = {
    loadNotes, 
    addNote,
    removeNote, 
    listNotes,
    readNote
};