const fs = require('fs');

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
        console.log(notes);
    } else {
        console.log('Note title taken', notes);
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

const removeNotes = (removedNoteTitle) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== removedNoteTitle);
    saveNotes(newNotes);
}

module.exports = {
    getNotes, 
    addNote
};