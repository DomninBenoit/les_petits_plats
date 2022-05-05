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

function extractApplianceInRecipe(recipe) {
    let listAppliance = [];
    if (!listAppliance.includes(recipe.appliance.toLowerCase())) {
        listAppliance.push(recipe.appliance.toLowerCase());
    }
    return listAppliance;
}

function extractUstensilInRecipe(recipe) {
    let listUstensil = [];
    recipe.ustensils.forEach((ustensil) => {
        if (!listUstensil.includes(ustensil.toLowerCase())) {
            listUstensil.push(ustensil.toLowerCase());
        }
    })
    return listUstensil
}

function filterByIngredientsTags(recipe, selectedIngredientsTags) {
    let listIngredients = [];
    recipe.ingredients.forEach((ingredient) => {
        listIngredients = ingredient.ingredient.toLowerCase().includes(selectedIngredientsTags);
    });
    return listIngredients;
}

function filterByApplianceTags(recipe, selectedApplianceTags) {
    return recipe.appliance.toLowerCase().includes(selectedApplianceTags);
}

function filterByUstensilsTags(recipe, selectedUstensilsTags) {
    let listUstensil = [];
    recipe.ustensils.forEach((ustensil) => {
       listUstensil = ustensil.toLowerCase().includes(selectedUstensilsTags);
    });
    return listUstensil
}

function filterRecipes() {
    let listIngredients = [];
    let listAppliance = [];
    let listUstensil = [];
    const general = document.getElementById('general');
    let valueInputGeneral = general.value;
    const selectedIngredientsTags = Array.prototype.map.call(document.getElementsByClassName('ingredientsTags'), (ingredient) => ingredient.textContent);
    const selectedApplianceTags = Array.prototype.map.call(document.getElementsByClassName('applianceTags'), (appliance) => appliance.textContent);
    const selectedUstensilsTags = Array.prototype.map.call(document.getElementsByClassName('ustensilsTags'), (ustensil) => ustensil.textContent);
    console.log(selectedApplianceTags)
    let recipesFilters = recipes.filter((recipe) => {
        if (searchGeneral(recipe, valueInputGeneral) && filterByIngredientsTags(recipe, selectedIngredientsTags) && filterByApplianceTags(recipe, selectedApplianceTags) && filterByUstensilsTags(recipe, selectedUstensilsTags)) {
            listIngredients = listIngredients.concat(extractIngredientsInRecipe(recipe))
            listAppliance = listAppliance.concat(extractApplianceInRecipe(recipe))
            listUstensil = listUstensil.concat(extractUstensilInRecipe(recipe))
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

function filterApplianceByApplianceBloc() {
    const appliance = document.getElementById('appareils');
    let listAppliance = [];
    appliance.addEventListener("keyup", (event) => {
        recipes.forEach((recipe) => {
            recipe.appliance.filter((app) => {
                listAppliance = app.toLowerCase().includes(event.target.value);
                console.log(listAppliance)
            })
        })
    })
}