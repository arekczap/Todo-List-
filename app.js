const getDom = {
  input: document.querySelector(".input__task"),
  labelInput: document.querySelector(".input__label"),
  addButton: document.querySelector(".button__add-task"),
  taskList: document.querySelector(".tasks__list"),
};

const tasks = [];
const finishedWithIf = [];
const newTasksWithoutFinished = [];
const newTasks = [];
const ifFinished = [];
let finishedTask;

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
  finishedWithIf.length = 0;
  newTasks.length = 0;

  tasks.forEach((task, index) => {
    task.dataset.id = index;
    finishedWithIf.push(ifFinished[index]);
    finishedWithIf.push(task);


    // TODO: zrobić sortowanie na noiwą tablicę, jeżeli true to leci na dół tablicy  a jeżeli nie wykonane to leci na górę
    finishedWithIf.forEach((finish, index) => {

      if ()


    });
    getDom.taskList.append(task);
  });

  getDom.input.value = "";
};

const createLiElement = () => {
  const liElement = document.createElement("li");
  liElement.className = "task__item";
  liElement.innerHTML = `<div class="task__container"><li class="task">${getDom.input.value}</li><div class="task__content"><button class="finish__button button"><span class="icon-ok"></span></button><button class="remove__button button "><span class="icon-trash-empty"></span></button></div></div>`;
  return liElement;
};

const removeTask = (e) => {
  const buttonLi = e.target.parentNode.parentNode.parentNode.parentNode;
  buttonLi.remove();
  tasks.splice(buttonLi.dataset.id, 1);
  reloadArray();
};

const finishTask = (e) => {
  const finishButton = e.target.parentNode;
  const taskValue = e.target.parentNode.parentNode.parentNode.firstChild;
  const idTaskLi = e.target.parentNode.parentNode.parentNode.parentNode;
  finishButton.classList.toggle("finished");

  if (taskValue.style.textDecoration === "line-through") {
    taskValue.style.textDecoration = "none";
    taskValue.style.opacity = "1";
  } else {
    taskValue.style.textDecoration = "line-through";
    taskValue.style.opacity = ".5";
  }

  ifFinished[idTaskLi.dataset.id] === "false"
    ? (ifFinished[idTaskLi.dataset.id] = "true")
    : (ifFinished[idTaskLi.dataset.id] = "false");

  reloadArray();
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
    ifFinished.push("false");

    // reload tablicy, odświeżenie id

    reloadArray();

    //usuwanie tasku
    liElement.querySelector(".icon-trash-empty").addEventListener("click", removeTask);
    //ukończenie tasku
    liElement.querySelector(".icon-ok").addEventListener("click", finishTask);
  }
};

//event na nacisnięcie przycisku po czym label w formularzu zostanie schowana
getDom.input.addEventListener("keypress", () => addInvalidLabel("false"));
//dodanie tasku
getDom.addButton.addEventListener("click", addTask);
