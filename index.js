let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//função para buscar dados da api

let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  //se o campo de entrada estiver vazio
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie </h3>`;
  }

  //se o campo de entrada não estiver vazio
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //se o filme existe no banco de dados
        if (data.Response == "True") {
          result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join(
                                  "</div><div>"
                                )}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Elenco:</h3>
                    <p>${data.Actors}</p>
                    <h3>Sinopse:</h3>
                    <p>${data.Plot}</p>                    
                `;
        }

        //se o filme não existir no banco de dados
        else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      //se ocorrer um erro
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
windows.addEventListener("load", getMovie);
