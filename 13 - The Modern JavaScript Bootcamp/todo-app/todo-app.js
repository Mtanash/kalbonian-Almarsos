let todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todos, filters);

document.querySelector("#search-input").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#todo-form").addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.elements.todoText.value !== "") {
    todos.push({
      id: uuidv4(),
      text: e.target.elements.todoText.value,
      completed: false,
    });
  }
  saveTodos(todos);
  renderTodos(todos, filters);
  e.target.elements.todoText.value = "";
});

document.querySelector("#hide-completed").addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
