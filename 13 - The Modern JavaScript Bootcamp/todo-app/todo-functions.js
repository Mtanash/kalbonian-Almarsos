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
  const todoElement = document.createElement("div");
  const checkboxElement = document.createElement("input");
  const textElement = document.createElement("span");
  const deleteButton = document.createElement("button");

  // set up checkbox button
  checkboxElement.setAttribute("type", "checkbox");
  todoElement.appendChild(checkboxElement);
  checkboxElement.checked = todo.completed;
  checkboxElement.addEventListener("change", (e) => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // set up todo text
  textElement.textContent = todo.text;
  todoElement.appendChild(textElement);

  // set up todo delete button
  deleteButton.textContent = "X";
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
  todosLeftElement.textContent = `You have ${incompletedTodos.length} todos left.`;
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
  document.querySelector("#todos-container").appendChild(todosLeftElement);

  filteredTodos.forEach((todo) => {
    const paragraph = generateTodosDOM(todo);
    document.querySelector("#todos-container").appendChild(paragraph);
  });
};
