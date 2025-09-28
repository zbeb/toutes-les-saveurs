import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";


const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    
    if (!id) return;

    // Loads Spinner
    recipeView.renderSpinner();

    // Loads Recipe
    await model.loadRecipe(id);
    
    // Redering recipe
    recipeView.render(model.state.recipe);
    
  }
  catch (err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render search results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));

    // Render pagination buttons
    paginationView.render(model.state.search);
  }
  catch (err) {
    console.log(`${err} ✈🏢💥`);
    throw err;
  }
}

const controlPagination = function(goToPage) {
    // Render new search results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // Render new pagination buttons
    paginationView.render(model.state.search);
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);

  paginationView.addHandlerClick(controlPagination);
}

init();