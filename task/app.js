const API_KEY = "af7eb04a"; // Replace with your OMDb API key
const searchForm = document.getElementById("searchForm");
const queryInput = document.getElementById("query");
const resultsDiv = document.getElementById("results");

// Listen for search form submission
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = queryInput.value.trim();
  if (query === "") return;

  resultsDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      resultsDiv.innerHTML = `<p>${data.Error}</p>`;
    }
  } catch (error) {
    resultsDiv.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    console.error(error);
  }
});

// Display movie results
function displayMovies(movies) {
  resultsDiv.innerHTML = "";
  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300"}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    // Optional: fetch details on click
    movieCard.addEventListener("click", () => fetchMovieDetails(movie.imdbID));

    resultsDiv.appendChild(movieCard);
  });
}

// Fetch detailed info
async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
    const data = await response.json();
    alert(`${data.Title} (${data.Year})\n\n${data.Plot}`);
  } catch (error) {
    console.error("Error fetching movie details", error);
  }
}   