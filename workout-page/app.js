

const bodyPartSelect = document.getElementById('body-part');
const trainBtn = document.getElementById('train-btn');
const searchResults = document.getElementById('search-results');
const pageEl = document.getElementById('pagination');



let bodyWeightExercisesArr = []; //Initial array for body weight exercises only
let currentPage = 1; //Initial page after search results appear
let rows = 30; // Number of rows per page


fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", {
    'method': "GET",
    'headers': {
        'X-RapidAPI-Key': '5ae70f18e2msh9711d2514b14edfp14d848jsn5571af2df747',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    } // Fetching data of list of body parts from API with API keys

    
}).then(response => response.json()).then(allBodyParts => { //API responds with data of list of body Parts and placed in JSON format (array)
        for(let i=0; i<allBodyParts.length; i++){ //looping through array of body part list
            bodyPartSelect.innerHTML += `<option>${allBodyParts[i]}</option>`; // each body part is appended to the <select> tag option list
        }
})

fetch("https://exercisedb.p.rapidapi.com/exercises", {
    'method': "GET",
    'headers': {
        'X-RapidAPI-Key': '5ae70f18e2msh9711d2514b14edfp14d848jsn5571af2df747',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    } // fetching data of list of exercises from API with API keys

}).then(response => response.json()).then(allExercises => { //API responds with list of all exercises and placed in JSON format (array)
    for(let i=0; i<allExercises.length; i++){ //looping through array of exercises
        if(allExercises[i].equipment === "body weight"){ //if statement to filter out exercises done with body weight only
            bodyWeightExercisesArr.push(allExercises[i]); // pushing each filtered body weight exercise to the bodyWeightExercisesArr
        }
    }
    displayList(bodyWeightExercisesArr, searchResults, rows, currentPage); //displaying each body weight exercise on the workout page
    setupPagination(bodyWeightExercisesArr, pageEl, rows); // paginating body weight exercises on the workout page

    trainBtn.addEventListener('click', () => { // event listener for a click on the train button which returns exercises based on the selected body part
        let filteredExercisesArr = []; // initial array of filtered out exercises based on body part
        bodyWeightExercisesArr.filter(e => {
            if(bodyPartSelect.value === e.bodyPart){
                filteredExercisesArr.push(e);
            }
        })
        console.log(filteredExercisesArr);
        displayList(filteredExercisesArr, searchResults, rows, currentPage);
        setupPagination(filteredExercisesArr, pageEl, rows);
    })
})




function displayList (items, wrapper, rowsPerPage, page){
    wrapper.innerHTML = "";
    page--;

    let start = rowsPerPage * page; 
    let end = start + rowsPerPage
    let paginatedItems = items.slice(start, end);

    // console.log(paginatedItems);

    for(let i = 0; i < paginatedItems.length; i++){
        let item = paginatedItems[i];

        let itemEl = document.createElement('div');
        itemEl.classList.add('item');
        itemEl.innerHTML = `<div class="card">
        <div class="gif-container">
            <img src=${item.gifUrl}>
        </div>
    </div>`;

        wrapper.appendChild(itemEl);
    }
}


function setupPagination(items, wrapper, rowsPerPage){
    wrapper.innerHTML = "";

    let pageCount = Math.ceil(items.length / rowsPerPage);
    for(let i = 1; i < pageCount + 1; i++){
       wrapper.appendChild(paginationBtn(i, items));
    }
}

function paginationBtn(page, items){
    let btn = document.createElement('button');
    btn.innerText = page;

    if(currentPage == page){
        btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
        currentPage = page;
        displayList(items, searchResults, rows, currentPage);

        let currentBtn = document.querySelector('.pagenumbers button.active');
        currentBtn.classList.remove('active');
        btn.classList.add('active');

    })

    return btn;
}