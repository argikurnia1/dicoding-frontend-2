//  Create Book Form
const submitForm = document.getElementById("submit-form");
const titleForm = document.getElementById("title-form");
const authorForm = document.getElementById("author-form");
const yearForm = document.getElementById("year-form");

// Search Book
const inputSearch = document.querySelector(".search-input");
const formSearch = document.getElementById("form-search");

// Book Content
const articletodo = document.querySelector(".to-do");
const articleDone = document.querySelector(".done");

let todos = [];
const SAVE_DATA = "save-data";
const TODO_ARRAY = "TODO_ARRAY";

//  Generate Unique Id
function generateId() {
  return +new Date();
}

// Generate Todo Object
function generateTodoObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Your browser don't support local storage");
    return false;
  }
  return true;
}

// Add To Do
function addTodo() {
  const id = generateId();
  let titleFormValue = titleForm.value;
  let authorFormValue = authorForm.value;
  let yearFormValue = yearForm.value;

  let isComplete = false;

  const todoObject = generateTodoObject(
    id,
    titleFormValue,
    authorFormValue,
    yearFormValue,
    isComplete
  );

  todos.push(todoObject);

  todoAction(todoObject);

  if (isStorageExist()) {
    document.dispatchEvent(new Event(SAVE_DATA));
  }
}

function confirmDelete() {
  return confirm("Are you sure want to delete?");
}

// To Do Action
function todoAction(todoItem) {
  // Create To Do

  // Create sectionContent
  const sectionContent = document.createElement("section");
  sectionContent.className = "book-content";
  sectionContent.id = `${todoItem.id}`;

  // Create Book Content Left
  const bookLeft = document.createElement("div");
  bookLeft.className = "book-left";

  sectionContent.append(bookLeft);

  if (!todoItem.isComplete) {
    // Progress Icon
    const progressIcon = document.createElement("img");
    progressIcon.src = "images/progress.svg";
    progressIcon.alt = "progress";
    bookLeft.append(progressIcon);

    articletodo.append(sectionContent);
  } else {
    // Progress Done Icon
    const progressIconDone = document.createElement("img");
    progressIconDone.src = "images/progress-done.svg";
    progressIconDone.alt = "progress-done";
    bookLeft.append(progressIconDone);

    articleDone.append(sectionContent);
  }

  // Book Intro
  const bookIntro = document.createElement("div");
  bookIntro.className = "book-intro";
  bookLeft.append(bookIntro);

  // Book Title
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = `${todoItem.title}`;
  bookIntro.append(bookTitle);

  // Book Author
  const bookAuthor = document.createElement("h4");
  bookAuthor.innerText = `${todoItem.author}`;
  bookIntro.append(bookAuthor);

  // Book Year
  const bookYear = document.createElement("h5");
  bookYear.innerText = `${todoItem.year}`;
  bookIntro.append(bookYear);

  // Create Book Content Right
  const bookRight = document.createElement("div");
  bookRight.className = "book-right";
  sectionContent.append(bookRight);

  // Create Book Action
  const bookAction = document.createElement("div");
  bookAction.className = "book-action";
  bookRight.append(bookAction);

  // Create Avatar
  const avatar = document.createElement("img");
  avatar.src = "images/avatar.svg";
  avatar.alt = "avatar";
  bookRight.append(avatar);

  // Create Button Action
  createButtonAction(todoItem, bookAction);

  titleForm.value = "";
  authorForm.value = "";
  yearForm.value = "";

  return sectionContent;
}

// Create Button Action
function createButtonAction(todoItem, bookAction) {
  // Create Button Delete Action
  const buttonDeleteAction = document.createElement("button");
  buttonDeleteAction.className = "btn-delete";

  // Create Delete Action
  const deleteAction = document.createElement("img");
  deleteAction.src = "images/delete.svg";
  deleteAction.alt = "delete";
  buttonDeleteAction.append(deleteAction);
  bookAction.append(buttonDeleteAction);

  // Event Listener and Event Handler
  buttonDeleteAction.addEventListener("click", function () {
    const confirmResult = confirmDelete();

    if (confirmResult) {
      const todoItemRemove = document.getElementById(`${todoItem.id}`);
      todoItemRemove.remove();

      deleteBookFromLocalStorage(todoItem.id);
      document.dispatchEvent(new Event(SAVE_DATA));
    }
  });

  // Create Button Done Action
  const buttonDoneAction = document.createElement("button");
  buttonDoneAction.className = "btn-done";
  if (!todoItem.isComplete) {
    // Create Done Action
    const doneAction = document.createElement("img");
    doneAction.src = "images/done.svg";
    doneAction.alt = "done";
    buttonDoneAction.append(doneAction);
    bookAction.append(buttonDoneAction);

    // Event Listener and Event Handler
    buttonDoneAction.addEventListener("click", function () {
      const todoItemRemove = document.getElementById(`${todoItem.id}`);
      todoItemRemove.remove();
      todoItem.isComplete = true;
      todoAction(todoItem);

      document.dispatchEvent(new Event(SAVE_DATA));
    });
  } else {
    // Create Button Undo Action
    const buttonUndoAction = document.createElement("button");
    buttonUndoAction.className = "btn-undo";

    // Create Undo Action
    const undoAction = document.createElement("img");
    undoAction.src = "images/undo.svg";
    undoAction.alt = "undo";
    buttonUndoAction.append(undoAction);
    bookAction.append(buttonUndoAction);

    // Event Listener and Event Handler
    buttonUndoAction.addEventListener("click", function () {
      const todoItemRemove = document.getElementById(`${todoItem.id}`);
      todoItemRemove.remove();
      todoItem.isComplete = false;
      todoAction(todoItem);

      document.dispatchEvent(new Event(SAVE_DATA));
    });
  }
}

function deleteBookFromLocalStorage(todoId) {
  for (let index = 0; index < todos.length; index++) {
    if (todos[index].id === todoId) {
      todos.splice(index, 1);
    }
  }
}

function loadFromLocalStroage() {
  let dataFromLocalStorage = JSON.parse(localStorage.getItem(TODO_ARRAY));

  if (dataFromLocalStorage !== null) {
    todos = dataFromLocalStorage;
  }

  renderData();
}

function renderData() {
  for (const todoItem of todos) {
    todoAction(todoItem);
  }
}

// Search Book
function searchBookByTitle() {
  const inputSearchValue = inputSearch.value.toUpperCase();

  for (let index = 0; index < todos.length; index++) {
    console.log(todos[index].title.toUpperCase().indexOf(inputSearchValue));
    if (todos[index].title.toUpperCase().indexOf(inputSearchValue) > -1) {
      const sectionContentById = document.getElementById(`${todos[index].id}`);
      sectionContentById.style.display = "flex";
    } else {
      const sectionContentById = document.getElementById(`${todos[index].id}`);
      sectionContentById.style.display = "none";
    }
  }
}

formSearch.addEventListener("submit", function (e) {
  e.preventDefault();
  searchBookByTitle();
});

// SAVED EVENT
document.addEventListener(SAVE_DATA, function () {
  const todoObjectJSON = JSON.stringify(todos);

  localStorage.setItem(TODO_ARRAY, todoObjectJSON);
});

document.addEventListener("DOMContentLoaded", function () {
  // Render From localStorage
  loadFromLocalStroage();
  // Submit Form
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTodo();
  });
});
