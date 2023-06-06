

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
        'X-RapidAPI-Key': '33bcc182a1mshce0fb87f6ee0427p1282b1jsnd36b11e0f70a',
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
        'X-RapidAPI-Key': '33bcc182a1mshce0fb87f6ee0427p1282b1jsnd36b11e0f70a',
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
        itemEl.classList.add('my-10');
        itemEl.classList.add('text-center');
        itemEl.classList.add('w-3/5');
        itemEl.classList.add('mx-auto');

        itemEl.innerHTML =
        `<p>
            ${item.name}
        </p>
        <img src=${item.gifUrl} class="w-1/5">
        <p>
            Target Muscle: ${item.target}
        </p>`;

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
    btn.classList.add('mx-1');
    btn.classList.add('border-2');
    btn.classList.add('border-solid');
    btn.classList.add('border-orange-600');
    btn.classList.add('bg-orange-100');
    btn.classList.add('text-orange-600');
    btn.classList.add('px-2');
    btn.classList.add('cursor-pointer');
    btn.classList.add('font-black');
    btn.classList.add('rounded-lg');
    btn.classList.add('my-1');
    btn.classList.add('hover:bg-orange-600');
    btn.classList.add('hover:text-2xl');

    btn.innerText = page;


    if(currentPage == page){
        btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
        currentPage = page;
        displayList(items, searchResults, rows, currentPage);

        let currentBtn = document.querySelector('#pagination button.active');
        currentBtn.classList.remove('active');
        btn.classList.add('active');

    })

    return btn;
}