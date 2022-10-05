// add Axios Library
const apiAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3", // it adds the base URL that it add in petition of api
  headers: {
    "Content-Type": "application/json;charset=utf-8", // telling the answer always is json
  },
  params: {
    api_key: API_KEY,
  },
});

const imageBasePoster = "https://image.tmdb.org/t/p/w500";
const imageBaseBackground = "https://image.tmdb.org/t/p/w1280";

// Navegation --> Got it!!!
async function getGenrsMenu() {
  const { data } = await apiAxios("/genre/movie/list");
  const genrs = data.genres;

  categoryListMobile.innerHTML = "";

  // List of genrs
  genrs.forEach((category) => {
    // poster movie
    const categoryTitle = document.createElement("li");
    categoryTitle.classList.add("nav-item");
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryName = document.createElement("a");
    categoryName.innerText = `${category.name}`;
    categoryTitle.appendChild(categoryName);
    categoryListMobile.appendChild(categoryTitle);
  });
}
getGenrsMenu();

// Utils
const createMoviesRow = (movies, section, container) => {
  // Clean DOM
  container.innerHTML = "";

  container.classList.add("movies-container-row");

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
    movieImage.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    // AppendChildren
    container.appendChild(movieImage);
  });
  section.appendChild(container);
};

const createMoviesColumn = (movies, section, container) => {
  // Clean DOM
  container.innerHTML = "";

  container.classList.add("movies-container-column");

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
    movieImage.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    // AppendChildren
    container.appendChild(movieImage);
  });
  section.appendChild(container);
};

/* -------------------------------------------------------- */

// Geners --> Get it!!!
async function getGenrsPreview() {
  const { data } = await apiAxios("/genre/movie/list");
  const genrs = data.genres;

  categoryListContainer.innerHTML = "";

  // List of genrs
  genrs.forEach((category) => {
    // poster movie
    const categoryTitle = document.createElement("li");
    const categoryName = document.createElement("a");
    categoryTitle.classList.add("nav-link", "col-4");
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    categoryName.innerText = `${category.name}`;
    categoryTitle.appendChild(categoryName);
    categoryListContainer.appendChild(categoryTitle);
  });
  categoryListSection.appendChild(categoryListContainer);
}

/* ---------------------------------------------------------------- */

// API caller

const getDiscoverPreview = async () => {
  // Call to APIs
  const { data } = await apiAxios("/movie/popular");
  const movies = data.results;

  // Carousel container
  homeCarouselSection.innerHTML = "";

  const carouselIndicatorsContainer = document.createElement("div");
  carouselIndicatorsContainer.classList.add("carousel-indicators");
  homeCarouselSection.appendChild(carouselIndicatorsContainer);
  const mainCarouselContainer = document.createElement("div");
  mainCarouselContainer.classList.add("carousel-inner");
  homeCarouselSection.appendChild(mainCarouselContainer);

  // Dataset attribute
  // const dataBsIntervalWithoutValue = document.createAttribute("data-bs");
  // const dataBsIntervalWithValue = document.setAttribute("data-bs", 'value');

  // Carousel of movies
  movies.forEach((movie, index) => {
    // Buttons carousel
    const buttonsCarousel = document.createElement("div");
    buttonsCarousel.setAttribute("type", "button");
    buttonsCarousel.setAttribute("data-bs-target", "#carouselExampleDark");
    buttonsCarousel.setAttribute("data-bs-slide-to", index);
    buttonsCarousel.setAttribute("aria-label", `Slide ${index}`);
    carouselIndicatorsContainer.appendChild(buttonsCarousel);

    if (index === 0) buttonsCarousel.classList.add("active");
    if (index === 0) buttonsCarousel.setAttribute("aria-current", "true");

    // Container carousel items
    const ItemContainer = document.createElement("div");
    ItemContainer.classList.add("carousel-item");
    if (index === 0) ItemContainer.classList.add("active");
    if (index === 0) ItemContainer.setAttribute("data-bs-interval", 10000);
    if (index > 0) ItemContainer.setAttribute("data-bs-interval", 6000);

    // Image container
    const imageContainer = document.createElement("picture");
    imageContainer.classList.add("image-container");
    // Image
    const image = document.createElement("img");
    image.classList.add("image");
    image.id = `image${index}`;
    image.src = `${imageBaseBackground}${movie.poster_path}`;
    image.setAttribute("alt", movie.title);
    imageContainer.appendChild(image);

    // Description container
    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add(
      "container-fluid",
      "description-container-movie"
    );
    const container = document.createElement("div");
    container.className = "container";
    const row = document.createElement("div");
    row.className = "row";
    container.appendChild(row);

    // Container description column
    const descriptionContainerPreview = document.createElement("div");
    descriptionContainerPreview.classList.add("col-12", "description-movie");
    const title = document.createElement("p");
    title.classList.add("title");
    title.innerText = movie.title;
    const descriptionPreview = document.createElement("div");
    const voteAveragePreview = document.createElement("p");
    voteAveragePreview.innerText = movie.vote_average;
    const starIcon = document.createElement("i");
    starIcon.classList.add("fas", "fa-star");
    voteAveragePreview.classList.add("d-inline-block", "description");
    const releaseDate = document.createElement("p");
    releaseDate.classList.add("d-inline-block", "description");
    releaseDate.innerText = movie.release_date;
    const language = document.createElement("p");
    language.classList.add("d-inline-block", "description");
    language.innerText = movie.original_language;
    const overview = document.createElement("p");
    overview.classList.add("about-movie");
    overview.innerText = movie.overview;

    // Append description
    descriptionContainerPreview.appendChild(title);
    descriptionPreview.appendChild(language);
    descriptionPreview.appendChild(releaseDate);
    descriptionPreview.appendChild(voteAveragePreview);
    voteAveragePreview.appendChild(starIcon);
    descriptionContainerPreview.appendChild(descriptionPreview);
    descriptionContainerPreview.appendChild(overview);
    row.appendChild(descriptionContainerPreview);

    // Action buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("col-12", "button-actions");
    const moreInfo = document.createElement("a");
    moreInfo.classList.add("button-info");
    moreInfo.innerText = "More info";
    const arrowRight = document.createElement("i");
    arrowRight.classList.add("fas", "fa-arrow-right");
    buttonContainer.appendChild(moreInfo);
    buttonContainer.appendChild(arrowRight);
    row.appendChild(buttonContainer);

    // Containers
    descriptionContainer.appendChild(container);
    mainCarouselContainer.appendChild(ItemContainer);
    ItemContainer.appendChild(imageContainer);
    ItemContainer.appendChild(descriptionContainer);
  });
};

const getTrendingMoviesPreview = async () => {
  const { data } = await apiAxios("/trending/movie/day");
  const movies = data.results;

  trendingLinkPreview.addEventListener("click", () => {
    location.hash = "#trends";
  });

  createMoviesRow(
    movies,
    trendingMoviesPreviewSection,
    trendingMoviesPreviewContainer
  );
};

const getTrendingMovies = async () => {
  const { data } = await apiAxios("/trending/movie/day");
  const movies = data.results;

  createMoviesColumn(movies, genericSection, genericContainer);
};

const getUpcomingMoviesPreview = async () => {
  const { data } = await apiAxios("/movie/upcoming");
  const movies = data.results;

  createMoviesRow(
    movies,
    upcomingMoviesPreviewSection,
    upcomingMoviesPreviewContainer
  );
};

// got it
const getMovieByGenres = async (id) => {
  // const movies = data.results;
  const { data } = await apiAxios("/discover/movie", {
    params: { with_genres: id },
  });
  const movies = data.results;

  createMoviesColumn(
    movies,
    moviesByCategorySection,
    moviesByCategoryContainer
  );
};

const getMoviesBySearch = async (query) => {
  // const movies = data.results;
  const { data } = await apiAxios("/search/movie", {
    params: { query },
  });
  const movies = data.results;

  createMoviesColumn(
    movies,
    moviesByCategorySection,
    moviesByCategoryContainer
  );
};

// Movie View
// got it
const getMovieById = async (id) => {
  // Call to APIs
  const { data: movie } = await apiAxios(`/movie/${id}`);

  imageDetail.src = `${imageBasePoster}${movie.poster_path}`;
  titleMovieDetail.textContent = movie.title;
  movieRuntime.textContent = `${movie.runtime}min`;
  releaseDate.textContent = movie.release_date;
  voteAverage.textContent = movie.vote_average;
  movieOverview.textContent = movie.overview;

  movie.genres.forEach((genr) => {
    const nameGenr = document.createElement("li");
    nameGenr.classList.add("name-genr");
    nameGenr.innerText = genr.name;
    genderList.appendChild(nameGenr);
  });

  getMoreContentMoviesPreview(id);
};

// got it
const getMoreContentMoviesPreview = async (id) => {
  const { data } = await apiAxios(`/movie/${id}/recommendations`, {
    params: { movie_id: id },
  });
  const relatedMovies = data.results;
  createMoviesRow(
    relatedMovies,
    moreContentPreviewSection,
    moreContentPreviewContainer
  );
};
// Footer
