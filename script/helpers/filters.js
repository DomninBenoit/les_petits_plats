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
    if (selectedIngredientsTags.length === 0) {
        return true
    } else {
        let listIngredients = [];
        for (let i = 0; i < extractIngredientsInRecipe(recipe).length; i++) {
            if (extractIngredientsInRecipe(recipe)[i].includes(selectedIngredientsTags)) {
                listIngredients.push(true);
            }
        }
        console.log(listIngredients.includes(true))
        /*let listIngredients = extractIngredientsInRecipe(recipe).map((ingredient) => selectedIngredientsTags.includes(ingredient.toLowerCase()));*/
        return listIngredients.includes(true);
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
        let listUstensil = recipe.ustensils.map((ustensil) => selectedUstensilsTags.includes(ustensil.toLowerCase()));
        return listUstensil.includes(true);
    }
}

function filterRecipes() {
    let listIngredients = [];
    let listAppliance = [];
    let listUstensil = [];
    const general = document.getElementById('general');
    let valueInputGeneral = general.value;
    let recipesFilters = recipes.filter((recipe) => {
        if (searchGeneral(recipe, valueInputGeneral) && (filterByIngredientsTags(recipe, selectedIngredientsTags) && filterByApplianceTags(recipe, selectedApplianceTags) && filterByUstensilsTags(recipe, selectedUstensilsTags))) {

            let recipeIngredients = extractIngredientsInRecipe(recipe).filter((ingredient) => !listIngredients.includes(ingredient.toLowerCase()))
            listIngredients = listIngredients.concat(recipeIngredients);

            if (!listAppliance.includes(recipe.appliance.toLowerCase())) {
                listAppliance.push(recipe.appliance.toLowerCase());
            }
            for (let i = 0; i < recipe.ustensils.length; i++) {
                for (ustensil of recipe.ustensils) {
                    if (!listUstensil.includes(ustensil.toLowerCase())) {
                        listUstensil.push(ustensil.toLowerCase());
                    }
                }
            }
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