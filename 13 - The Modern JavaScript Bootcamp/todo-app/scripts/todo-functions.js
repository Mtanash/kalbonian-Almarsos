"use strict";

const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const deleteTodo = function (id) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex > -1) todos.splice(todoIndex, 1);
};

const toggleTodo = function (id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) todo.completed = !todo.completed;
};

const generateTodosDOM = (todo) => {
  const todoElement = document.createElement("label");
  const containerElement = document.createElement("div");
  const checkboxElement = document.createElement("input");
  const textElement = document.createElement("span");
  const deleteButton = document.createElement("button");

  // set up checkbox button
  checkboxElement.setAttribute("type", "checkbox");
  containerElement.appendChild(checkboxElement);
  checkboxElement.checked = todo.completed;
  checkboxElement.addEventListener("change", (e) => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // set up todo text
  textElement.textContent = todo.text;
  containerElement.appendChild(textElement);

  // set up container
  todoElement.classList.add("list-item");
  containerElement.classList.add("list-item__container");
  todoElement.appendChild(containerElement);

  // set up todo delete button
  deleteButton.textContent = "remove";
  deleteButton.classList.add("button", "button--text");
  todoElement.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => {
    deleteTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoElement;
};

const generateSummaryDOM = (incompletedTodos) => {
  const todosLeftElement = document.createElement("h2");
  todosLeftElement.classList.add("list-title");
  const todoString = incompletedTodos.length === 1 ? "todo" : "todos";
  todosLeftElement.textContent = `You have ${incompletedTodos.length} ${todoString} left.`;
  return todosLeftElement;
};

const renderTodos = (todos, filters) => {
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

  const incompletedTodos = filteredTodos.filter((todo) => !todo.completed);

  const todosLeftElement = generateSummaryDOM(incompletedTodos);
  todosContainer.appendChild(todosLeftElement);

  if (filteredTodos.length < 1) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "No to do's to show";
    todosContainer.appendChild(emptyMessage);
  } else {
    filteredTodos.forEach((todo) => {
      const paragraph = generateTodosDOM(todo);
      todosContainer.appendChild(paragraph);
    });
  }
};
