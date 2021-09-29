const todos = [
  {
    text: "Pray",
    completed: true,
  },
  {
    text: "Study programming",
    completed: false,
  },
  {
    text: "Go to gym",
    completed: false,
  },
  {
    text: "Eat healthy food",
    completed: true,
  },
  {
    text: "Exercise",
    completed: false,
  },
];

const filters = {
  searchText: "",
  hideCompleted: false,
};

const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter((todo) => {
    if (filters.hideCompleted) {
      return (
        todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) &&
        todo.completed !== filters.hideCompleted
      );
    } else {
      return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    }
  });
  filters.filterResult = filteredTodos;

  const todosContainer = document.querySelector("#todos-container");
  todosContainer.innerHTML = "";

  const incompletedTodos = filteredTodos.filter((todo) => {
    return !todo.completed;
  });

  const todosLeftElement = document.createElement("h2");
  todosLeftElement.textContent = `You have ${incompletedTodos.length} todos left.`;
  document.querySelector("#todos-container").appendChild(todosLeftElement);

  filteredTodos.forEach((todo) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = todo.text;
    document.querySelector("#todos-container").appendChild(paragraph);
  });
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
      text: e.target.elements.todoText.value,
      completed: false,
    });
  }
  renderTodos(todos, filters);
  e.target.elements.todoText.value = "";
});

document.querySelector("#hide-completed").addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
