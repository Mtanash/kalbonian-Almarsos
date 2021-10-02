// read notes from local storage
const getSavedNotes = function () {
  const notesJSON = localStorage.getItem("notes");
  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

// remove note from the list
const removeNote = function (id) {
  const noteIndex = notes.findIndex((note) => {
    return note.id === id;
  });

  if (noteIndex > -1) notes.splice(noteIndex, 1);
};

// generate note dom
const generateNoteDOM = function (note) {
  const noteElement = document.createElement("div");
  const textElement = document.createElement("a");
  const button = document.createElement("button");

  // set up button element
  button.textContent = "X";
  noteElement.appendChild(button);
  button.addEventListener("click", () => {
    removeNote(note.id);
    saveData(notes);
    renderNotes(notes, filters);
  });

  // set up text element
  if (note.title.length > 0) {
    textElement.textContent = note.title;
  } else {
    textElement.textContent = "Unnamed note";
  }
  textElement.setAttribute("href", `./edite.html#${note.id}`);
  noteElement.appendChild(textElement);

  return noteElement;
};

// sort notes by on of the filters
const sortNotes = function (notes, sortBy) {
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
const renderNotes = function (notes, filters) {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  const notesContainer = document.querySelector("#notes-container");
  notesContainer.innerHTML = "";

  filteredNotes.forEach((note) => {
    const noteElement = generateNoteDOM(note);
    notesContainer.appendChild(noteElement);
  });
};

// save data to lacalstorage
const saveData = function (notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
};
