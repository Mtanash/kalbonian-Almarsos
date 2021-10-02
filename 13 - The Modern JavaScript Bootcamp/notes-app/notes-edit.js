"use strict";

const noteTitle = document.querySelector("#note-title");
const noteBody = document.querySelector("#note-body");
const lastEdited = document.querySelector("#last-edited");
const removeNoteButton = document.querySelector("#remove-note");

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => note.id == noteId);

if (!note) {
  location.assign("./index.html");
}

// set up note title
noteTitle.value = note.title;
noteTitle.addEventListener("input", (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  lastEdited.textContent = `Last updated ${moment(note.updatedAt).fromNow()}`;
  saveData(notes);
});

// set up note body
noteBody.value = note.body;
noteBody.addEventListener("input", (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  lastEdited.textContent = `Last updated ${moment(note.updatedAt).fromNow()}`;
  saveData(notes);
});

// set up note remove button
removeNoteButton.addEventListener("click", () => {
  removeNote(note.id);
  saveData(notes);
  location.assign("./index.html");
});

// set up last edited text
lastEdited.textContent = `Last updated ${moment(note.updatedAt).fromNow()}`;

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    note = notes.find((note) => {
      return note.id == noteId;
    });

    if (!note) {
      location.assign("./index.html");
    }

    noteTitle.value = note.title;
    noteBody.value = note.body;
    lastEdited.textContent = `Last updated ${moment(note.updatedAt).fromNow()}`;
  }
});
