const API_URL_BASE = "https://api.themoviedb.org/3";

// Geners
async function getCategoriesPreview() {
  const response = await fetch(
    `${API_URL_BASE}/genre/movie/list?api_key=${API_KEY}`
  );
  const data = await response.json();
  const categories = data.genres;
  console.log(categories);

  const categoriesPreviewContainer = document.getElementById("categories");

  //   // container
  const categoryContainer = document.createElement("ul");
  categoryContainer.classList.add("category-list");

  // get movie from movies
  categories.forEach((category) => {
    // poster movie
    const categoryTitle = document.createElement("li");
    const categoryName = document.createElement("a");
    categoryTitle.classList.add("nav-link");
    categoryName.innerText = `${category.name}`;
    // AppendChildren
    categoryTitle.appendChild(categoryName);
    categoryContainer.appendChild(categoryTitle);
  });
  categoriesPreviewContainer.appendChild(categoryContainer);
}

// Trending
async function getTrendingMoviesPreview() {
  const response = await fetch(
    `${API_URL_BASE}/trending/movie/day?api_key=${API_KEY}`
  );
  const data = await response.json();
  const movies = data.results;

  const tendingPreviewContainer = document.getElementById("tendingPreview");

  // container
  const movieContainer = document.createElement("picture");
  movieContainer.classList.add("movies-container");

  // get movie from movies
  movies.forEach((movie) => {
    // poster movie
    const movieImage = document.createElement("img");
    movieImage.classList.add("poster-movie");
    movieImage.setAttribute("alt", movie.title);
    movieImage.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    );

    // AppendChildren
    movieContainer.appendChild(movieImage);
  });
  tendingPreviewContainer.appendChild(movieContainer);
}

// Call Actions Funtion
getCategoriesPreview();
getTrendingMoviesPreview();
