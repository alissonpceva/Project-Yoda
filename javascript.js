var searchFormEl = document.querySelector('#search-form');

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
        // create card
        
        // display card 

      }

    })
    .catch(err => {
      console.error(err);
    });
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
  .catch((err) => console.error(err))

// ----- This is to render cards to the page after searching------//
const cardsContainer = $('#cards-container')
function renderMovies(movieObject) {
  movieObject.plots.forEach(plot => {
    const div = $('div');
    const image = $('img');
    const title = $('h3');
    const description = $('h3');

    console.log(plot)

    // ---CSS for Cards---//
    div.classList = 'card'
    image.classList = 'card-img'

    image.src = plot.image
    title.innerText = `Title: ${plot.title} `
    description.innerText = ` Description: ${plot.description} `
    div.append(image)
    div.append(title)
    div.append(description)
    cardsContainer.appendChild(div)
  });
};

function GetDataApiYoda(text) {
  let apiURL = `https://api.funtranslations.com/translate/yoda.json?text=${text}`
  fetch(apiURL)
    .then(response => response.json())
    .then(apiResults => {
      console.log(apiResults)
    })
}
