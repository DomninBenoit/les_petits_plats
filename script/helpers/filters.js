function searchGeneral(recipe, value) {
    if (value === "") {
        return true;
    } else {
        return recipe.name.toLowerCase().includes(value.toLowerCase()) ||
            recipe.description.toLowerCase().includes(value.toLowerCase())
    }
}

function extractIngredientsInRecipe(recipe) {
    let listIngredients = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
        for (const ingredient of recipe.ingredients) {
            if (!listIngredients.includes(ingredient.ingredient.toLowerCase())) {
                listIngredients.push(ingredient.ingredient.toLowerCase());
            }
        }
    }
    return listIngredients;
}

function filterByIngredientsTags(recipe, selectedIngredientsTags) {
    let ingredientsInRecipe = extractIngredientsInRecipe(recipe);
    if (selectedIngredientsTags.length === 0) {
        return true
    } else {
        let listIngredients = [];
        for (let i = 0; i < selectedIngredientsTags.length; i++) {
            if (ingredientsInRecipe.findIndex((ingredient) => ingredient.toLowerCase() === selectedIngredientsTags[i].toLowerCase()) > -1) {
                listIngredients.push(true);
            } else {
                listIngredients.push(false);
            }
        }
        return !listIngredients.includes(false);
    }
}

function filterByApplianceTags(recipe, selectedApplianceTags) {
    if (selectedApplianceTags.length === 0) {
        return true;
    } else {
        return selectedApplianceTags.includes(recipe.appliance.toLowerCase());
    }
}

function filterByUstensilsTags(recipe, selectedUstensilsTags) {
    if (selectedUstensilsTags.length === 0) {
        return true
    } else {
        let listUstensil = [];
        for (let i = 0; i < selectedUstensilsTags.length; i++) {
            if (recipe.ustensils.findIndex((ustensil) => ustensil.toLowerCase() === selectedUstensilsTags[i].toLowerCase()) > -1) {
                listUstensil.push(true)
            } else {
                listUstensil.push(false);
            }
        }
        return !listUstensil.includes(false);
    }
}

function filterRecipes() {
    let listIngredients = [];
    let listAppliance = [];
    let listUstensil = [];
    const general = document.getElementById('general');
    let valueInputGeneral = general.value;
    let recipesFilters = [];

    for (let i = 0; i < recipes.length; i++) {

        if (searchGeneral(recipes[i], valueInputGeneral) && (filterByIngredientsTags(recipes[i], selectedIngredientsTags) && filterByApplianceTags(recipes[i], selectedApplianceTags) && filterByUstensilsTags(recipes[i], selectedUstensilsTags))) {

                let recipeIngredients = [];
                let ingredientsInRecipe = extractIngredientsInRecipe(recipes[i]);
                for (let j = 0; j < ingredientsInRecipe.length; j++) {
                    if (!listIngredients.includes(ingredientsInRecipe[j].toLowerCase())) {
                        recipeIngredients.push(ingredientsInRecipe[j]);
                    }
                }
                listIngredients = listIngredients.concat(recipeIngredients);

                if (!listAppliance.includes(recipes[i].appliance.toLowerCase())) {
                    listAppliance.push(recipes[i].appliance.toLowerCase());
                }
                for (let j = 0; j < recipes[j].ustensils.length; j++) {
                    for (ustensil of recipes[j].ustensils) {
                        if (!listUstensil.includes(ustensil.toLowerCase())) {
                            listUstensil.push(ustensil.toLowerCase());
                        }
                    }
                }
                recipesFilters.push(recipes[i]);
            }
        }
    displayRecipe(recipesFilters);
    displayIngredients(listIngredients);
    displayAppliance(listAppliance);
    displayUstensils(listUstensil);
    tagEvent();
};


function searchFilter() {
    const general = document.getElementById('general');
    general.addEventListener("keyup", () => {
        filterRecipes()
    })
};

function filterIngredientsByIngredientsBloc() {
    const ingredients = document.getElementById('ingredients');
    ingredients.addEventListener("keyup", (event) => {
        let ingredientFilter = []
        for (let i = 0; i < globalListIngredients.length; i++) {
            if (globalListIngredients[i].includes(event.target.value.toLowerCase())) {
                ingredientFilter.push(globalListIngredients[i]);
            }
        }
        displayIngredients(ingredientFilter);
        tagEventCreatorIngredients();
    })
}

function filterApplianceByApplianceBloc() {
    const appliance = document.getElementById('appareils');
    appliance.addEventListener("keyup", (event) => {
        let applianceFilter = [];
        for (let i = 0; i < globalListAppliance.length; i++) {
            if (globalListAppliance[i].includes(event.target.value.toLowerCase())) {
                applianceFilter.push(globalListAppliance[i]);
            }
        }
        displayAppliance(applianceFilter);
        tagEventCreatorAppliance();
    })
}

function filterUstensilByUstensilesBloc() {
    const ustensil = document.getElementById('ustensiles');
    ustensil.addEventListener("keyup", (event) => {
        let ustensilsFilter = [];
        for (let i = 0; i < globalListUstensil.length; i++) {
            if (globalListUstensil[i].includes(event.target.value.toLowerCase())) {
                ustensilsFilter.push(globalListUstensil[i]);
            }
        }
        displayUstensils(ustensilsFilter);
        tagEventCreatorUstensils();
    })
}