const inputTag = document.getElementById("inputTag");

inputTag.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && inputTag.value.trim() !== "") {
    const inputValue = inputTag.value;
    inputTag.value = "";
    const listItem = createListItem(inputValue);
    document.getElementById("container").appendChild(listItem);
  }
});

function createListItem(newValue) {
  const li = document.createElement("li");
  li.classList = "divContainer";
  const div = document.createElement("div");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const label = document.createElement("label");
  label.textContent = newValue;

  const span = document.createElement("span");
  span.classList = "more-options";
  span.innerText = "...";
  div.appendChild(checkbox);
  div.appendChild(label);

  li.appendChild(div);
  li.appendChild(span);

  return li;
}

function createTodoList(newLists) {
  const container = document.getElementById("container");
  const ul = document.createElement("ul");

  newLists.forEach((newList) => {
    const listItem = createListItem(newList);
    ul.appendChild(listItem);
  });

  container.appendChild(ul);
  //container ul li div and span
}

const tasks = [];

// Create and append the todo list
createTodoList(tasks);

//Let's add fiter section to control the action

const allBtb = document.getElementById("allBtb");
const pendingBtb = document.getElementById("pendingBtb");
const completedBtn = document.getElementById("completedBtn");
const clearBtn = document.getElementById("clearBtn");
//Function of clear button:
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all items?")) {
    const liElements = document.querySelectorAll("li");
    liElements.forEach((li) => li.remove());
    //console.log(clearBtn);
  }
});

//Function of pendingBtn

pendingBtb.addEventListener("click", () => {
  const liElements = document.querySelectorAll("li");
  liElements.forEach((li) => {
    const checkbox = li.querySelector('input[type="checkbox"]');
    if (checkbox && !checkbox.checked) {
      li.style.display = ""; // Show pending tasks
    } else {
      li.style.display = "none"; // Hide completed tasks
    }
  });
});

//Function of completedBtn

completedBtn.addEventListener("click", () => {
  const liElements = document.querySelectorAll("li");
  liElements.forEach((li) => {
    const checkbox = li.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      li.style.display = ""; // Show pending tasks
    } else {
      li.style.display = "none"; // Hide completed tasks
    }
  });
});

// Function of allBtn

allBtb.addEventListener("click", () => {
  const liElements = document.querySelectorAll("li");
  liElements.forEach((li) => {
    li.style.display = ""; // Show pending tasks
  });
});
