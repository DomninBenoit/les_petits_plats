function displayRecipe(recipesArray) {
    const recipesSection = document.querySelector('.recipe_section');

    recipesSection.innerHTML = "";
    recipesArray.forEach((recipe) => {
        const recipeModel = recipesFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    })
}

function displayIngredients(listIngredients) {
    const dropdownIngredients = document.getElementById('dropdownIngredients');
    dropdownIngredients.innerHTML = "";
    listIngredients.forEach((ingredientList) => {
        const ingredient = document.createElement('li');
        const lienIngredient = document.createElement('a');
        lienIngredient.classList.add('dropdown-item', 'eventIngredients');
        lienIngredient.textContent = ingredientList;
        ingredient.appendChild(lienIngredient);
        dropdownIngredients.appendChild(ingredient);
    })
    return dropdownIngredients;
}

function displayAppliance(listAppliance) {
    const dropdownAppliance = document.getElementById('dropdownAppliance');
    listAppliance.innerHTML = "";
    listAppliance.forEach((applianceList) => {
        const appliance = document.createElement('li');
        const lienAppliances = document.createElement('a');
        lienAppliances.classList.add('dropdown-item', 'eventAppliance');
        lienAppliances.textContent = applianceList;
        appliance.appendChild(lienAppliances);
        dropdownAppliance.appendChild(appliance);
    });
    return dropdownAppliance;
}

function displayUstensils(listUstensils) {
    const dropdownUstensils = document.getElementById('dropdownUstensils');
    listUstensils.forEach((ustensilsList) => {
        const ustensil = document.createElement('li');
        const lienUstensil = document.createElement('a');
        lienUstensil.classList.add('dropdown-item', 'eventUstensils');
        lienUstensil.textContent = ustensilsList;
        ustensil.appendChild(lienUstensil);
        dropdownUstensils.appendChild(ustensil);
    });
    return dropdownUstensils;
}


function tagEvent() {
    const eventIngredients = document.getElementsByClassName('eventIngredients');
    const eventAppliance = document.getElementsByClassName('eventAppliance');
    const eventUstensils = document.getElementsByClassName('eventUstensils');
    tagEventCreator(eventIngredients, "ingredientsTags");
    tagEventCreator(eventAppliance, "applianceTags");
    tagEventCreator(eventUstensils, "ustensilsTags");
};

function tagEventCreator(event, btnColor) {
    const tagList = document.getElementById("tagList");
    for (let i = 0; i < event.length; i++) {
        event[i].addEventListener("click", (e) => {
            let text = e.target.innerText;
            const tag = `<button type="button" class="${btnColor}">
      <span class="tag">${text}</span><i class="far fa-times-circle"></i></button>`
            tagList.insertAdjacentHTML('beforeend', tag);
            tagClose();
        })
    }
};

function tagClose() {
    const close = document.getElementsByClassName('fa-times-circle');
    close[close.length - 1].addEventListener("click", (event) => {
        let node = event.target.parentNode;
        node.parentNode.removeChild(node)
    });
}

function searchGeneral(recipe, value) {

    return recipe.name.toLowerCase().includes(value.toLowerCase()) ||
        recipe.description.toLowerCase().includes(value.toLowerCase())
}

function searchTags(recipe) {
    let listIngredients2 = [];
        recipe.ingredients.forEach((ingredient) => {
            if (!listIngredients2.includes(ingredient.ingredient.toLowerCase())) {
                listIngredients2.push(ingredient.ingredient.toLowerCase());
            }
        })
    console.log(listIngredients2)
    return listIngredients2;

    /*recipe.ingredients.findIndex((ingredient) => ingredient.ingredient.toLowerCase()).includes(ingredientsTags.findIndex((tagSelect) => tagSelect.toLowerCase()));*/

}

function searchFilter() {
    const general = document.getElementById('general');

    general.addEventListener("keyup", (event) => {
        let recipesFilters = recipes.filter((recipe) => {
            return searchGeneral(recipe, event.target.value) && searchTags(recipe);
        })
        displayRecipe(recipesFilters);
        displayIngredients(recipesFilters);

    });
}

function init() {
    let listIngredients = [];
    let listAppliance = [];
    let listUstensil = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            if (!listIngredients.includes(ingredient.ingredient.toLowerCase())) {
                listIngredients.push(ingredient.ingredient.toLowerCase());

            }
        })
        if (!listAppliance.includes(recipe.appliance.toLowerCase())) {
            listAppliance.push(recipe.appliance.toLowerCase());
        }

        recipe.ustensils.forEach((ustensil) => {
            if (!listUstensil.includes(ustensil.toLowerCase())) {
                listUstensil.push(ustensil.toLowerCase());

            }
        })
    });
    const click = document.querySelector('.fa-chevron-down');
    click.addEventListener("click", () => {
        const ingBloc = document.querySelector('.ingredientBloc');
        ingBloc.classList.toggle("dropdownOpen");
    })
    displayRecipe(recipes);
    displayIngredients(listIngredients);
    displayAppliance(listAppliance);
    displayUstensils(listUstensil);
    tagEvent();
    searchFilter();
};

init();

