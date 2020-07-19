const getDom = {
    input: document.querySelector('.input__task'),
    labelInput: document.querySelector('.input__label'),
    addButton: document.querySelector('.button__add-task'),
    doneButton: document.querySelector('.finish__button'),
    taskList: document.querySelector('.tasks__list'),

}

taskNumber = 0;
const tasks = [];



// dodawanie label w przypadku nie wprowadzenia wartości
const addInvalidLabel = (state) => {
    if (state == 'true') {
        getDom.labelInput.style.top = '-1.5rem';
        getDom.labelInput.style.display = 'block';
    } else {
        getDom.labelInput.style.top = '1rem';
        getDom.labelInput.style.display = 'none';
    }
};


const addTask = (e) => {
    e.preventDefault();


    //sprawdzanie czy input nie jest pusty czy nie ma białych spacji
    if (getDom.input.value.trim() == '' || getDom.input.value.trim() == null || getDom.input.value.trim() == " ") {
        addInvalidLabel('true');
        getDom.input.value = '';
    } else {
        addInvalidLabel('false');




        // tasks.taskID.push();


        //dodawanie elementu do html 
        const liElement = document.createElement('li');
        liElement.className = 'task__item';
        liElement.dataset.id = taskNumber - 1;
        liElement.innerHTML = `<div class="task__container" data-id=${taskNumber - 1}><li class="task">${getDom.input.value}</li><div class="task__content"><button class="finish__button button"><span class="icon-ok"></span></button><button class="remove__button button " data-id=${taskNumber - 1}><span class="icon-trash-empty"></span></button></div></div>`;
        getDom.taskList.append(liElement);

        // document.querySelector('.remove__button').dataset.id = tasks.taskID[taskNumber];
        tasks.push(getDom.input.value);
        taskNumber++

        tasks.forEach(task => {
            getDom.taskList.append(liElement);
        })


        getDom.input.value = '';

        liElement.querySelector('.remove__button').addEventListener('click', removeTask);

    };
};

const removeTask = (e) => {
    const index = e.target.parentNode.parentNode.parentNode.dataset.id;

    tasks.splice(index, 1);
    console.log(tasks);

    document.querySelector('.task__item').remove();

    // console.log(`klikam element  o id: ${id}`)



};



getDom.addButton.addEventListener('click', addTask);
getDom.input.addEventListener('keypress', () => addInvalidLabel('false'));