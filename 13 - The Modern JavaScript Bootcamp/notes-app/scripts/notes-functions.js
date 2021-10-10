"use strict";

// read notes from local storage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// remove note from the list
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex > -1) notes.splice(noteIndex, 1);
};

// generate note dom
const generateNoteDOM = (note) => {
  const noteElement = document.createElement("a");
  const textElement = document.createElement("p");
  const status = document.createElement("p");

  // set up text element
  if (note.title.length > 0) {
    textElement.textContent = note.title;
  } else {
    textElement.textContent = "Unnamed note";
  }
  textElement.classList.add("list-item__title");
  noteElement.appendChild(textElement);

  // set up link
  noteElement.setAttribute("href", `./edite.html#${note.id}`);
  noteElement.classList.add("list-item");

  // set up status
  status.textContent = generateLastEdited(note.updatedAt);
  status.classList.add("list-item__subtitle");
  noteElement.appendChild(status);

  return noteElement;
};

// sort notes by on of the filters
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

// render application notes
const renderNotes = (notes, filters) => {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  const notesContainer = document.querySelector("#notes-container");
  notesContainer.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteElement = generateNoteDOM(note);
      notesContainer.appendChild(noteElement);
    });
  } else {
    const temporaryElement = document.createElement("h3");
    temporaryElement.textContent = "Start adding todos.";
    temporaryElement.classList.add("empty-message");
    notesContainer.appendChild(temporaryElement);
  }
};

// save data to lacalstorage
const saveData = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// generate last edited text
const generateLastEdited = (timestamp) => {
  return `Last updated ${moment(timestamp).fromNow()}`;
};
