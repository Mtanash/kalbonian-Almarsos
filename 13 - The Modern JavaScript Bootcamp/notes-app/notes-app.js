const notes = [
  {
    title: "Go to Gym",
    body: "Go to Gym two days a week",
  },
  {
    title: "make new habbits",
    body: "Eat healthy food. Work out.",
  },
  {
    title: "improve language",
    body: "Improve English speaking and writing skills",
  },
];

const filters = {
  searchText: "",
};

const renderNotes = function (notes, filters) {
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  const notesContainer = document.querySelector("#notes-container");
  notesContainer.innerHTML = "";

  filteredNotes.forEach((note) => {
    const noteElement = document.createElement("p");
    noteElement.textContent = note.title;
    notesContainer.appendChild(noteElement);
  });
};

renderNotes(notes, filters);

document.querySelector("#create-note").addEventListener("click", (e) => {
  e.target.textContent = "The button was clicked";
});

document.querySelector("#search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
  console.log(e.target.value);
});
