const getDom = {
  input: document.querySelector(".input__task"),
  labelInput: document.querySelector(".input__label"),
  addButton: document.querySelector(".button__add-task"),
  doneButton: document.querySelector(".finish__button"),
  taskList: document.querySelector(".tasks__list"),
};

const tasks = [];

// dodawanie label w przypadku nie wprowadzenia wartości
const addInvalidLabel = (state) => {
  if (state == "true") {
    getDom.labelInput.style.top = "-1.5rem";
    getDom.labelInput.style.display = "block";
  } else {
    getDom.labelInput.style.top = "1rem";
    getDom.labelInput.style.display = "none";
  }
};

const reloadArray = () => {
  getDom.taskList.textContent = "";

  tasks.forEach((task, index) => {
    task.dataset.id = index;
    getDom.taskList.append(task);
  });
};

const createLiElement = () => {
  const liElement = document.createElement("li");
  liElement.className = "task__item";
  liElement.innerHTML = `<div class="task__container"><li class="task">${getDom.input.value}</li><div class="task__content"><button class="finish__button button"><span class="icon-ok"></span></button><button class="remove__button button "><span class="icon-trash-empty"></span></button></div></div>`;

  return liElement;
};
const addTask = (e) => {
  e.preventDefault();

  //sprawdzanie czy input nie jest pusty czy nie ma białych spacji
  if (getDom.input.value.trim() == "" || getDom.input.value.trim() == null || getDom.input.value.trim() == " ") {
    addInvalidLabel("true");
    getDom.input.value = "";
  } else {
    addInvalidLabel("false");

    //tworzenie elementu li
    var liElement = createLiElement();

    //dodawanie taska do tablicy
    tasks.push(liElement);

    // reload tablicy, odświeżenie id
    reloadArray();

    getDom.input.value = "";
    liElement.querySelector(".icon-trash-empty").addEventListener("click", removeTask);
  }
};

const removeTask = (e) => {
  const buttonLi = e.target.parentNode.parentNode.parentNode.parentNode;

  buttonLi.remove();
  tasks.splice(buttonLi.dataset.id, 1);

  reloadArray();
};

getDom.addButton.addEventListener("click", addTask);

//event na nacisnięcie przycisku po czym label w formularzu zostanie schowana
getDom.input.addEventListener("keypress", () => addInvalidLabel("false"));
