// ------ This is to have the Search bar log the searched term in a <p> tag to be used while searching in the API
// ------ This is to have the Search bar log the searched term in a <p> tag to be used while searching in the API
var searchFormEl = document.querySelector('#search-form');

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
        // create card
        
        // display card 

      }

      // let cards = list.map((item) => {
      //   console.log(item.id)
      //   GetDataApiYoda(item.s)
      //   let rowAlignment = document.createElement("div")
      //   rowAlignment.classList.add("row")
      //   let colDiv = document.createElement("div")
      //   colDiv.classList.add("col-md-6")
      //    return( `<div class="row">
      //     <div class="col s12 m7">
      //       <div id="${item.id} class="card">
      //         <div class="card-image">
      //           <img src="${item.i.imageUrl}"
      //           <span class="card-title">${item.l}</span>
      //         </div>
      //         <div class="card-content">
      //           <p>${item.r}</p>
      //           <p>rank:${item.rank}</p>
      //           <p>year:${item.y}</p>
      //         </div>
      //         <div class="card-action">
      //           <a href="#">This is a link</a>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // `)
      //} )
      // document.getElementById("alignment").innerHTML = cards
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
