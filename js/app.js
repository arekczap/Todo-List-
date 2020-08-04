(function () {
  const selectors = {
    input: document.querySelector(".input__task"),
    searchInput: document.querySelector('.search__input'),
    labelInput: document.querySelector(".input__label"),
    addButton: document.querySelector(".button__add-task"),
    taskList: document.querySelector(".tasks__list"),
  };

  const unsortedTasks = [];
  const partOfFinishedTasks = [];
  const partOfNoFinishedTasks = [];
  let tasksSortedFinishedToNoFinished = [];
  let finalSortedArrayToPrint = [];
  // let finishedTask;

  // dodawanie label w przypadku nie wprowadzenia wartości
  setInvalidLabel = (state) => {

    const { labelInput } = selectors;
    const { dataset } = labelInput;
    dataset.active = state;

  };

  reloadArray = () => {
    const { taskList } = selectors;
    taskList.textContent = "";
    partOfFinishedTasks.length = 0;
    partOfNoFinishedTasks.length = 0;
    tasksSortedFinishedToNoFinished.length = 0;

    unsortedTasks.forEach((task, index) => {
      task.dataset.finished == "true" ? partOfFinishedTasks.push(task) : partOfNoFinishedTasks.push(task);
      task.dataset.id = index;
    });

    tasksSortedFinishedToNoFinished = partOfNoFinishedTasks.concat(partOfFinishedTasks);

    if (selectors.searchInput.value.length !== 0) {
      finalSortedArrayToPrint.forEach((task) => {
        selectors.taskList.append(task)
      })
    } else {
      tasksSortedFinishedToNoFinished.forEach((task) => {
        selectors.taskList.append(task);
      })
    }
    selectors.input.value = "";
  }

  createLiElement = () => {
    const liElement = document.createElement("li");
    liElement.className = "task__item";
    liElement.innerHTML = `<div class="task__container"><li class="task">${selectors.input.value}</li><div class="task__content"><button class="finish__button button"><span class="icon-ok"></span></button><button class="remove__button button "><span class="icon-trash-empty"></span></button></div></div>`;
    return liElement;
  };

  removeTask = (e) => {
    const buttonLi = e.target.parentNode.parentNode.parentNode.parentNode;
    buttonLi.remove();
    unsortedTasks.splice(buttonLi.dataset.id, 1);
    reloadArray();
  };

  finishTask = (e) => {
    const finishButton = e.target.parentNode;
    const idTaskLi = e.target.parentNode.parentNode.parentNode.parentNode;
    finishButton.classList.toggle("finished");

    idTaskLi.dataset.finished === "false" ? (idTaskLi.dataset.finished = "true") : (idTaskLi.dataset.finished = "false");

    reloadArray();
  };

  filterTasks = (e) => {

    if (tasksSortedFinishedToNoFinished.length > 0) {
      finalSortedArrayToPrint = tasksSortedFinishedToNoFinished.filter((element) => {
        const { firstChild: { firstChild: filteredElement } } = element;
        return filteredElement.textContent.toLowerCase().includes(e.target.value.toLowerCase());
      });
      reloadArray();
    };
  }

  addTask = (e) => {
    e.preventDefault();
    let { input: { value: valueOfInputTask } } = selectors;
    //sprawdzanie czy input nie jest pusty czy nie ma białych spacji
    if (valueOfInputTask.trim() == "") {

      setInvalidLabel("true");

      valueOfInputTask = "";
    } else {

      setInvalidLabel("false");
      //tworzenie elementu li
      var liElement = createLiElement();
      liElement.dataset.finished = "false";

      // czyszczenie wyszukiwania przy dodawaniu tasku
      selectors.searchInput.value = "";

      //dodawanie taska do tablicy
      unsortedTasks.push(liElement);

      // reload tablicy, odświeżenie id

      reloadArray();

      //usuwanie tasku
      liElement.querySelector(".icon-trash-empty").addEventListener("click", removeTask);
      //ukończenie tasku
      liElement.querySelector(".icon-ok").addEventListener("click", finishTask);
    }
  };

  //event na nacisnięcie przycisku po czym label w formularzu zostanie schowana
  selectors.input.addEventListener("keypress", () => setInvalidLabel("false"));
  //filtrowanie taskow
  selectors.searchInput.addEventListener('input', filterTasks);
  //dodanie tasku
  selectors.addButton.addEventListener("click", addTask);

})();