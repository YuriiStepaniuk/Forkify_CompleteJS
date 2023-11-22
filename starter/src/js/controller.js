import * as model from './model';
import recipeView from './Views/recipeView';
import searchView from './Views/searchView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './Views/searchView';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get seach Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Rendering results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
