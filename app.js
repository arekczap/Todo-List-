const getDom = {
    input: document.querySelector('.input__task'),
    labelInput: document.querySelector('.input__label'),
    addButton: document.querySelector('.button__add-task'),
    doneBUtton: document.querySelector('.finish__button'),
    deleteButton: document.querySelector('.remove__button'),
    taskList: document.querySelector('.tasks__list'),

}


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
        console.log('dziala')
        tasks.push(getDom.input.value);


        //dodawanie elementu do html 
        const liElement = document.createElement('li');
        liElement.className = 'tasks__list';
        liElement.innerHTML = `<div class="task__container"><li class="task">${getDom.input.value}</li><div class="task__content"><button class="finish__button button"><span class="icon-ok"></span></button><button class="remove__button button"><span class="icon-trash-empty"></span></button></div></div>`;
        getDom.taskList.append(liElement);
        getDom.input.value = '';
    }
};

const closeLabel = () => {
    getDom.labelInput.classList.remove('active');
};



getDom.addButton.addEventListener('click', addTask);
getDom.input.addEventListener('keypress', () => addInvalidLabel('false'));