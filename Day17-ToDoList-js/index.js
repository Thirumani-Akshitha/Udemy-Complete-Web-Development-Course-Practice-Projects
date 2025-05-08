const taskInput = document.getElementById('type');
const taskList = document.getElementById('taskList');

function addTask(){
    const taskText = taskInput.value.trim();
    if(taskText === '') return;


const taskItem = document.createElement('div');
taskItem.className = "flex items-center mb-1";

const checkBox = document.createElement('input');
checkBox.type = 'checkbox';
checkBox.className = "mr-2";

const label = document.createElement('label');
label.textContent = taskText;
label.className = "text-sm text-black"

checkBox.addEventListener('change', function(){

    if(checkBox.checked){
        label.classList.add('line-through', 'text-gray-800');
        } else {
            label.classList.remove('line-through', 'text-gray-800');
        }
});

taskItem.appendChild(checkBox);
taskItem.appendChild(label);
taskList.appendChild(taskItem);

taskInput.value = '';

}


taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addTask();
    }
  });
  
