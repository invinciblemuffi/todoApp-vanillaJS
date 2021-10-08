const editIconURL =
  "https://img.icons8.com/material-outlined/25/006400/pencil--v1.png";
const deleteIconURL = "https://img.icons8.com/pastel-glyph/25/8b0000/trash.png";
const doneIconURL =
  "https://img.icons8.com/material-outlined/25/00ab00/checkmark--v1.png";
const undoIconURL =
  "https://img.icons8.com/fluency-systems-regular/25/000000/undo--v1.png";
const addItemIcon = document.getElementById("addItemIcon");
const listContainer = document.getElementsByClassName("list-group");
const todoInputElement = document.querySelector("input[name='todoName']");
let editEl,
  todoItemSpan,
  todoItemText = "",
  todoListGroupItem,
  todoInputText,
  editIcon,
  deleteIcon,
  doneIcon,
  undoIcon;

const addSomeItemsInit = () => {
  listContainer[0].innerText === ""
    ? (listContainer[0].innerHTML =
        "<h2 class='text-center text-muted'>Let's roll & add some items</h2>")
    : document.querySelector("h2") && document.querySelector("h2").remove();
};

addSomeItemsInit();

const initActionsItems = () => {
  editIcon = document.createElement("img");
  editIcon.setAttribute("src", editIconURL);

  deleteIcon = document.createElement("img");
  deleteIcon.setAttribute("src", deleteIconURL);

  doneIcon = document.createElement("img");
  doneIcon.setAttribute("src", doneIconURL);
};

todoInputElement.addEventListener("keyup", (e) => {
  e.target.value.trim() === ""
    ? e.target.setAttribute("placeholder", "Oops...Enter a task name")
    : e.keyCode === 13 && addTodoItemToDOM();
});

addItemIcon.addEventListener("click", (e) => {
  e.target.previousElementSibling.value.trim() === ""
    ? e.target.previousElementSibling.setAttribute(
        "placeholder",
        "Oops...Enter a task name"
      )
    : addTodoItemToDOM();
});

const addTodoItemToDOM = () => {
  addSomeItemsInit();
  todoListGroupItem = document.createElement("li");
  todoListGroupItem.className = "list-group-item";
  //   todoListGroupItem.setAttribute("id", `item-id-${Math.random() * Math.PI}`);

  todoItemSpan = document.createElement("span");
  todoItemSpan.innerText = todoInputElement.value;

  todoListItemIconsSpan = document.createElement("span");
  todoListItemIconsSpan.className = "list-item--icons";

  initActionsItems();

  todoListItemIconsSpan.appendChild(editIcon);
  todoListItemIconsSpan.appendChild(deleteIcon);
  todoListItemIconsSpan.appendChild(doneIcon);

  todoListGroupItem.appendChild(todoItemSpan);
  todoListGroupItem.appendChild(todoListItemIconsSpan);

  listContainer[0].appendChild(todoListGroupItem);

  editItem();

  deleteItem();

  completedItem();

  todoInputElement.value = "";
  todoInputElement.setAttribute("placeholder", "Let's add some tasks...");
};

const editItem = () => {
  editIcon.addEventListener("click", (e) => {
    editEl = e.target.parentNode.previousSibling;
    editEl.contentEditable = "true";
    editEl.focus();
    editEl.addEventListener(
      "keydown",
      (e) => e.keyCode === 13 && e.preventDefault()
    );
    editEl.addEventListener("blur", () => {
      editEl.contentEditable = "false";
    });
  });
};

const deleteItem = () => {
  deleteIcon.addEventListener("click", (e) => {
    el = e.target.parentNode.parentNode;
    el.remove();
    addSomeItemsInit();
  });
};

const completedItem = () => {
  doneIcon.addEventListener("click", (e) => {
    el = e.target.parentNode.previousSibling;
    el.style.setProperty("text-decoration", "line-through");
    editElForCurrentItem = e.target.parentNode.children[0];
    editElForCurrentItem.style.setProperty("display", "none");
    e.target.style.setProperty("display", "none");

    undoIconNode = [...e.target.parentNode.childNodes].filter((child) =>
      child.currentSrc.includes(undoIconURL)
    );
    if (undoIconNode.length < 1) {
      undoIcon = document.createElement("img");
      undoIcon.setAttribute("src", undoIconURL);
      e.target.parentNode.appendChild(undoIcon);
    } else {
      el.style.setProperty("text-decoration", "line-through");
      e.target.parentNode.children[3].style.setProperty(
        "display",
        "inline-block"
      );
      editElForCurrentItem.style.setProperty("display", "none");
    }
    undoItem(el, editElForCurrentItem);
  });
};

const undoItem = (el, editElForCurrentItem) => {
  undoIcon.addEventListener("click", (e) => {
    el.style.setProperty("text-decoration", "none");
    e.target.style.setProperty("display", "none");
    e.target.parentNode.children[2].style.setProperty(
      "display",
      "inline-block"
    );
    editElForCurrentItem.style.setProperty("display", "inline-block");
  });
};
