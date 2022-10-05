searchFormButton.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});

backArrow.addEventListener("click", () => {
  history.back();
  // location.hash = "#home";
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  console.log(location.hash);

  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    moviePage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Navigation Pages
function homePage() {
  console.log("Home!");
  backArrow.classList.add("inactive");

  categoryListSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  moviesByCategorySection.classList.add("inactive");
  movieDetailsSection.classList.add("inactive");
  moreContentPreviewSection.classList.add("inactive");

  getDiscoverPreview();
  getTrendingMoviesPreview();
  getUpcomingMoviesPreview();
}

function trendsPage() {
  console.log("Trends!");
  backArrow.classList.remove("inactive");

  homeCarouselSection.classList.add("inactive");
  categoryListSection.classList.add("inactive");
  moviesByCategorySection.classList.add("inactive");
  trendingMoviesPreviewSection.classList.add("inactive");
  upcomingMoviesPreviewSection.classList.add("inactive");
  movieDetailsSection.classList.add("inactive");
  moreContentPreviewSection.classList.add("inactive");

  genericTitle.innerHTML = "Trending";

  getTrendingMovies();
}

function searchPage() {
  console.log("Search!");
  backArrow.classList.remove("inactive");

  homeCarouselSection.classList.add("inactive");
  categoryListSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  trendingMoviesPreviewSection.classList.add("inactive");
  upcomingMoviesPreviewSection.classList.add("inactive");
  moreContentPreviewSection.classList.add("inactive");
  movieDetailsSection.classList.add("inactive");

  // [#search, value]
  const [_, query] = location.hash.split("=");
  movieByCategoryTitle.textContent = query;
  getMoviesBySearch(query);
}

function moviePage() {
  console.log("Movie!");
  backArrow.classList.remove("inactive");

  homeCarouselSection.classList.add("inactive");
  categoryListSection.classList.add("inactive");
  trendingMoviesPreviewSection.classList.add("inactive");
  upcomingMoviesPreviewSection.classList.add("inactive");

  moviesByCategorySection.classList.add("inactive");
  genericSection.classList.add("inactive");

  movieDetailsSection.classList.remove("inactive");

  // [#movie, value]
  const [_, movieId] = location.hash.split("=");

  getMovieById(movieId);
}

function categoriesPage() {
  console.log("Category!");
  backArrow.classList.remove("inactive");

  trendingMoviesPreviewSection.classList.add("inactive");
  upcomingMoviesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailsSection.classList.add("inactive");
  categoryListSection.classList.add("inactive");
  homeCarouselSection.classList.add("inactive");
  moreContentPreviewSection.classList.add("inactive");

  const [_, categoryData] = location.hash.split("="); // ['#category', 'id-name']
  const [categoryId, categoryName] = categoryData.split("-");

  movieByCategoryTitle.textContent = categoryName;
  getMovieByGenres(categoryId);
}
