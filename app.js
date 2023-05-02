fetch("https://exercisedb.p.rapidapi.com/exercises", {
    'method': "GET",
    'headers': {
        'X-RapidAPI-Key': '7b2843c6ccmshbe16a05f1f0eda4p1d7dd0jsn2c77e6ae67e2',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
})
.then(response => response.json())
.then(response =>{
    console.log(response);
})