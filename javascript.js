var searchFormEl = document.querySelector('#search-form');
var resultContentEl = document.querySelector('#result-content');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  getMovieAPI(searchInputVal)
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit)

function getMovieAPI(searchInputVal) {
  // ----- Fetch the IMDB Top 100 API  tt0416449-----//
  let queryURL = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=' + searchInputVal
  fetch(queryURL, {
    "method": 'GET',
    headers: {
      'X-RapidAPI-Key': 'f870a2f23bmsh9eda1e7be572773p1a63bfjsn838fbce364f9',
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

      for (var i = 0; i < 4; i++) {
        // get plot
        console.log(i);

        let queryURL2 = 'https://online-movie-database.p.rapidapi.com/title/get-plots?tconst=' + data.d[i].id
        fetch(queryURL2, {
          "method": 'GET',
          headers: {
            'X-RapidAPI-Key': 'f870a2f23bmsh9eda1e7be572773p1a63bfjsn838fbce364f9',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
          }
        })
          .then(response => {
            return response.json()
          })
          .then(data => {
            console.log("LINE 67", data)
            {
              console.log(data.base.title)
              printResults(data.base, data.plots[0]);
              
              console.log(data.plots)
              console.log(data.base.image)
            }
            // renderMovies(data)
          })


        // display card 

      }

    })
    .catch(err => {
      console.error(err);
    });
}


// These are the containers for the cards
function printResults(resultObj, reviewObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  // - Body of the Card
  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  // - Title of the Card
  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  // - Image of the movie for the Card
  var imgEl = document.createElement('img');
  imgEl.textContent = resultObj.image.url;

  // - Year the movie came out
  var plotEl = document.createElement('p');
  plotEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.year + '<br/>';

console.log('review objects', reviewObj)

  // - Plot of the movie for the card
  if (reviewObj.text) {
    plotEl.innerHTML +=
      '<strong>Subjects:</strong> ' + reviewObj.text;
  } else {
    plotEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  var yodaButton = document.createElement('button')
  yodaButton.textContent = "Yoda Reviews!"
  yodaButton.addEventListener("click", function(){
   console.log( GetDataApiYoda (reviewObj.text,plotEl))
  })


//  - Create the the div for a link to an IMDB page for more information
  var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, imgEl, yodaButton, plotEl, linkButtonEl);
  resultCard.append(resultBody);
  console.log("testing render to page")
  resultContentEl.append(resultCard);

  return resultCard;

}

table.appendChild(printResults)

// --- This is to create the click function on the search! bar to render the cards to the homepage
searchFormEl.addEventListener("submit", printResults);

function GetDataApiYoda(text, plotEl) {
  let apiURL = `https://api.funtranslations.com/translate/yoda.json?text=${text}`

  return fetch(apiURL)
    .then(response => response.json())
    .then(apiResults => {
      console.log(apiResults)
      plotEl.innerHTML = apiResults.contents.translated
      return apiResults
    })
}
