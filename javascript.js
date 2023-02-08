// ------ This is to have the Search bar log the searched term in a <p> tag to be used while searching in the API
// ------ This is to have the Search bar log the searched term in a <p> tag to be used while searching in the API
var searchFormEl = document.querySelector('#search-form');
var resultContentEl = document.querySelector('#result-content');

function handleSearchFormSubmit(event) {
  event.preventDefault();
  
  // if ($("#search-movie")) {
  //   $("#search-movie").remove()
  // }
  // if ($("#search-movie")) {
  //   $("#search-movie").remove()
  // }

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  // alert("Search input val" + searchInputVal)
  // var p = $("<p>")
  // p.text(searchInputVal);
  // p.attr("id", "search-movie")
  // var searchResults = $("#Searchresults")
  // searchResults.append(p)
  getMovieAPI(searchInputVal)
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit)

function getMovieAPI(searchInputVal) {
  // ----- Fetch the IMDB Top 100 API  tt0416449-----//
  //let queryURL ='https://online-movie-database.p.rapidapi.com/title/get-details?tconst=tt0416449'
  let queryURL = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=' + searchInputVal
  fetch(queryURL, {
    "method": 'GET',
    headers: {
      'X-RapidAPI-Key': 'b3e59746a5mshc0979fd711196a9p14039bjsn78f8f7f86bba',
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
  })
    .then(response => {
      console.log("LINE 44", response)
      return response.json()
    })
    .then(data => {
      console.log("LINE 48", data)
      const list = data.d[0];
      console.log("LINE 50", list)

      for (var i = 0; i < 4; i++){
        // get plot
        console.log(i);

        let queryURL2 = 'https://online-movie-database.p.rapidapi.com/title/get-plots?tconst=' + data.d[i].id
        fetch(queryURL2, {
          "method": 'GET',
          headers: {
            'X-RapidAPI-Key': 'b3e59746a5mshc0979fd711196a9p14039bjsn78f8f7f86bba',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
          }
        })
          .then(response => {
            return response.json()
          })
          .then(data => {
            console.log("LINE 67", data)
            // renderMovies(data)
          })
        .catch(err => {
          console.error(err);
        });
    }
        // create card

        function printResults(resultObj) {
            console.log(resultObj);

        var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.date + '<br/>';

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong> ' + resultObj.description[0];
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

  var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);

        // display card 


}
// -----Fetch the Yoda API------//
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b3e59746a5mshc0979fd711196a9p14039bjsn78f8f7f86bba",
    "X-RapidAPI-Host": "rapidalex-i-am-groot-v1.p.rapidapi.com",
  },
};
fetch("https://rapidalex-i-am-groot-v1.p.rapidapi.com/grootSpeak", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err))})
