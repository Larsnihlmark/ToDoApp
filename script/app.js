
// Select the Element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input")

// classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Array
let LIST = [], id=0;

//Get localStorage
let data = localStorage.getItem("TODO");

//Data not empty parse it to localstorage
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST)
}else{
    LIST = [];
    id = 0;
}
// Load the all the list with loop
function loadList(array){
    array.forEach(item => {
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

// Button clear localstorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Show date
const options = {weekday: "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//Print out li class with paraments for update value 
function addToDo(toDo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH: "";

    const item = 
            `
            <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}" ></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
            </li>
            `;
    const position = "beforeend"

    list.insertAdjacentHTML(position, item)
}


//Input Enter Press take in LIST Array

document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false 
            })
            localStorage.setItem("TODO", JSON.stringify(LIST))
            id++;
        }
        input.value = "";
    }
});

//Toggle Complete Mark 

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false: true;
}

//Trash Mark remove Id

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Target the mark
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST))
})