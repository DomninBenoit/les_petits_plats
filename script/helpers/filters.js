function searchGeneral(recipe, value) {
    return recipe.name.toLowerCase().includes(value.toLowerCase()) ||
        recipe.description.toLowerCase().includes(value.toLowerCase())
}

function extractIngredientsInRecipe(recipe) {
    let listIngredients = [];
    recipe.ingredients.forEach((ingredient) => {
        if (!listIngredients.includes(ingredient.ingredient.toLowerCase())) {
            listIngredients.push(ingredient.ingredient.toLowerCase());
        }
    })
    return listIngredients;
}

function filterByIngredientsTags(recipe, selectedIngredientsTags) {
    let listIngredients = extractIngredientsInRecipe(recipe).map((ingredient) => selectedIngredientsTags.includes(ingredient.toLowerCase()));
    return listIngredients.includes(true);
}

function filterByApplianceTags(recipe, selectedApplianceTags) {
    return selectedApplianceTags.includes(recipe.appliance.toLowerCase());
}

function filterByUstensilsTags(recipe, selectedUstensilsTags) {
    let listUstensil = recipe.ustensils.map((ustensil) => selectedUstensilsTags.includes(ustensil.toLowerCase()));
    return listUstensil.includes(true);
}

function filterRecipes() {

    let listIngredients = [];
    let listAppliance = [];
    let listUstensil = [];
    const general = document.getElementById('general');
    let valueInputGeneral = general.value;
    let recipesFilters = recipes.filter((recipe) => {
        if (searchGeneral(recipe, valueInputGeneral) || filterByIngredientsTags(recipe, selectedIngredientsTags)/* || filterByApplianceTags(recipe, selectedApplianceTags) || filterByUstensilsTags(recipe, selectedUstensilsTags)*/) {

            let recipeIngredients = extractIngredientsInRecipe(recipe).filter((ingredient) => !listIngredients.includes(ingredient.toLowerCase()))
            listIngredients = listIngredients.concat(recipeIngredients);

            if (!listAppliance.includes(recipe.appliance.toLowerCase())) {
                listAppliance.push(recipe.appliance.toLowerCase());
            }
            recipe.ustensils.forEach((ustensil) => {
                if (!listUstensil.includes(ustensil.toLowerCase())) {
                    listUstensil.push(ustensil.toLowerCase());
                }
            })
            return true;
        }
        return false;
    })
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
    let listIngredients = [];
    ingredients.addEventListener("keyup", (event) => {
        let recipesFilters = recipes.filter((recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                if (ingredient.ingredient.toLowerCase().includes(event.target.value.toLowerCase())) {
                    if (!listIngredients.includes(ingredient.ingredient.toLowerCase())) {
                        listIngredients.push(ingredient.ingredient.toLowerCase());
                    }
                }
            })
        })
    console.log(listIngredients)
    displayIngredients(listIngredients);
    })
}

function filterApplianceByApplianceBloc() {
    const appliance = document.getElementById('appareils');
    let listAppliance = [];
    appliance.addEventListener("keyup", (event) => {
        let recipesFilters = recipes.filter((recipe) => {
            if (recipe.appliance.toLowerCase().includes(event.target.value.toLowerCase())) {
                if (!listAppliance.includes(recipe.appliance.toLowerCase())) {
                    listAppliance.push(recipe.appliance.toLowerCase())
                }
            }
        })
        console.log(listAppliance)
        displayAppliance(listAppliance);
    })
}

function filterUstensilByUstensilesBloc() {
    const ustensil = document.getElementById('ustensiles');
    let listUstensil = [];
    ustensil.addEventListener("keyup", (event) => {
        let recipesFilters = recipes.filter((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
                if (ustensil.toLowerCase().includes(event.target.value.toLowerCase())) {
                    if (!listUstensil.includes(ustensil.toLowerCase())) {
                        listUstensil.push(ustensil.toLowerCase())
                    }
                }
            })
        })
        console.log(listUstensil)
        displayUstensils(listUstensil);
    })
}