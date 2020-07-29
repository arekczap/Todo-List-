const getDom = {
  input: document.querySelector(".input__task"),
  searchInput: document.querySelector('.search__input'),
  labelInput: document.querySelector(".input__label"),
  addButton: document.querySelector(".button__add-task"),
  taskList: document.querySelector(".tasks__list"),
};

const tasks = [];
const newTasksWithFinished = [];
const newTasksWithoutFinished = [];
let sortedArray = [];
let finishedTask;

// dodawanie label w przypadku nie wprowadzenia wartości
addInvalidLabel = (state) => {


  state == "true" ?
    getDom.labelInput.dataset.active = "true" :
    getDom.labelInput.dataset.active = "false";

};

reloadArray = () => {
  getDom.taskList.textContent = "";
  newTasksWithFinished.length = 0;
  newTasksWithoutFinished.length = 0;
  sortedArray.length = 0;

  tasks.forEach((task, index) => {
    task.dataset.finished == "true" ? newTasksWithFinished.push(task) : newTasksWithoutFinished.push(task);
    task.dataset.id = index;
  });

  sortedArray = newTasksWithoutFinished.concat(newTasksWithFinished);

  sortedArray.forEach((task) => {
    getDom.taskList.append(task);
  });

  getDom.input.value = "";
};

createLiElement = () => {
  const liElement = document.createElement("li");
  liElement.className = "task__item";
  liElement.innerHTML = `<div class="task__container"><li class="task">${getDom.input.value}</li><div class="task__content"><button class="finish__button button"><span class="icon-ok"></span></button><button class="remove__button button "><span class="icon-trash-empty"></span></button></div></div>`;
  return liElement;
};

removeTask = (e) => {
  const buttonLi = e.target.parentNode.parentNode.parentNode.parentNode;
  buttonLi.remove();
  tasks.splice(buttonLi.dataset.id, 1);
  reloadArray();
};

finishTask = (e) => {
  const finishButton = e.target.parentNode;
  const taskValue = e.target.parentNode.parentNode.parentNode.firstChild;
  const idTaskLi = e.target.parentNode.parentNode.parentNode.parentNode;
  finishButton.classList.toggle("finished");

  idTaskLi.dataset.finished === "false" ?
    (idTaskLi.dataset.finished = "true") :
    (idTaskLi.dataset.finished = "false");

  reloadArray();
};

filterTasks = (e) => {
  const searchText = e.target.value.toLowerCase();
  let newArr = sortedArray;
  newArr = newArr.filter(element => {
    // element.textContent.toLowerCase().includes(searchText);
    console.log(element.textContent)
    element.textContent.toLowerCase() == searchText;
  });

  console.log("search: " + searchText)
  console.log("new arr: " + sortedArray)


  // newArr.length = 0;

}

addTask = (e) => {
  e.preventDefault();
  //sprawdzanie czy input nie jest pusty czy nie ma białych spacji
  if (getDom.input.value.trim() == "" || getDom.input.value.trim() == null || getDom.input.value.trim() == " ") {
    addInvalidLabel("true");
    getDom.input.value = "";
  } else {
    addInvalidLabel("false");
    //tworzenie elementu li
    var liElement = createLiElement();
    liElement.dataset.finished = "false";

    //dodawanie taska do tablicy
    tasks.push(liElement);

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


//filtrowanie taskow
getDom.searchInput.addEventListener('input', filterTasks);

//dodanie tasku
getDom.addButton.addEventListener("click", addTask);