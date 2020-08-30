//learn how to use cookies

let addButton = document.querySelector('.add-button');
let textField = document.querySelector('.text-field');
let toDoList = document.querySelector('.to-do-list');
let errorMessage = document.querySelector('.error-message');
let completedTasks = document.querySelector('.completed-tasks');


textField.focus();
errorMessage.style.display = 'none';
addButton.addEventListener('click', addTask);
textField.addEventListener('keydown', function(e){
    if(e.keyCode === 13){
        addTask();
    }
});

function addTask(){
    if(textField.value.length === 0){
        console.log('hi');
        errorMessage.textContent = 'Enter a task please';
        errorMessage.style.display = 'block';
        return;
    }

    if(textField.value.length  > 20){
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Tasks must be 20 characters or less';
        textField.value = null;
        return;
    }
    errorMessage.style.display = 'none';

    //create taskContainer
    let taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    //task text
    let task = document.createElement('div');
    task.classList.add('task');
    task.textContent = textField.value;
    taskContainer.appendChild(task);

    //edit and delete button container
    /*let taskButtons = document.createElement('div');
    taskButtons.classList.add('task-buttons');*/

    //edit button
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', editTask);
    editButton.classList.add('edit-button');
    //taskButtons.appendChild(editButton);
    taskContainer.appendChild(editButton);

    //delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);
    deleteButton.classList.add('delete-button');
    taskContainer.appendChild(deleteButton);
    
    let completeButton = document.createElement('button');
    completeButton.textContent = 'Completed';
    completeButton.addEventListener('click', completeTask);
    completeButton.classList.add('complete-button');
    taskContainer.appendChild(completeButton);

    toDoList.appendChild(taskContainer);
    textField.value = null;
    textField.focus();
}


function editTask(){
    this.parentNode.childNodes[0].style.display = 'none';
    let newInput = document.createElement('input');
    newInput.setAttribute('type','text');
    newInput.classList.add('edit-text-field');
    newInput.addEventListener('keydown', function(event){
        if(event.keyCode === 13){
            if(newInput.value.length === 0){
                errorMessage.textContent = 'Enter a task please';
                errorMessage.style.display = 'block';
                newInput.focus();
                return;
            }
            if(newInput.value.length > 20){
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Tasks must be 20 characters or less';
                newInput.value = null;
                newInput.focus();
                return;
            }

            errorMessage.style.display = 'none';
            this.parentNode.childNodes[1].textContent = newInput.value;
            this.parentNode.childNodes[1].style.display = 'block';
            this.parentNode.removeChild(newInput);
            textField.focus();
        }
    }
    );

    this.parentNode.prepend(newInput);
    newInput.focus();
}

function deleteTask(){
    this.parentNode.parentNode.removeChild(this.parentNode);
}

function completeTask(){
    //remove edit button
    this.parentNode.removeChild(this.parentNode.childNodes[1]);
    completedTasks.appendChild(this.parentNode);
    this.parentNode.classList.add('style-completed-task');
    //this.parentNode.classList.remove('task');
    this.parentNode.removeChild(this.parentNode.childNodes[2]);
}