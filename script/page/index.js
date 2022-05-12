const selectedIngredientsTags = [];
const selectedApplianceTags = [];
const selectedUstensilsTags = [];
let globalListIngredients = [];
let globalListAppliance = [];
let globalListUstensil = [];

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
    dropdownAppliance.innerHTML = "";
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
    dropdownUstensils.innerHTML = "";
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

//adding a specific class depending on the selected tag
function tagEvent() {
    tagEventCreatorIngredients();
    tagEventCreatorAppliance();
    tagEventCreatorUstensils();
};

function tagEventCreatorIngredients() {
    const eventIngredients = document.getElementsByClassName('eventIngredients');
    tagEventCreator(eventIngredients, "ingredientsTags");
}

function tagEventCreatorAppliance() {
    const eventAppliance = document.getElementsByClassName('eventAppliance');
    tagEventCreator(eventAppliance, "applianceTags")
}

function tagEventCreatorUstensils() {
    const eventUstensils = document.getElementsByClassName('eventUstensils');
    tagEventCreator(eventUstensils, "ustensilsTags");
}

// creation of tag buttons and addition of tag data in tag tables
function tagEventCreator(event, typeTag) {
    const tagList = document.getElementById("tagList");
    for (let i = 0; i < event.length; i++) {
        event[i].addEventListener("click", (e) => {
            let text = e.target.innerText;
            if (typeTag === 'ingredientsTags') {
                selectedIngredientsTags.push(text);
            } else if (typeTag === 'applianceTags') {
                selectedApplianceTags.push(text);
            } else if (typeTag === 'ustensilsTags') {
                selectedUstensilsTags.push(text);
            }
            filterRecipes();
            const tag = `<button type="button" class="${typeTag}Btn">
      <span class="tag ${typeTag}">${text}</span><i class="far fa-times-circle"></i></button>`
            tagList.insertAdjacentHTML('beforeend', tag);
            tagClose(text, typeTag);
        })
    }
};

function tagClose(label, typeTag) {
    const close = document.getElementsByClassName('fa-times-circle');
    close[close.length - 1].addEventListener("click", (event) => {
        if (typeTag === 'ingredientsTags') {
            selectedIngredientsTags.splice(selectedIngredientsTags.findIndex((ingredient) => ingredient === label), 1);
        } else if (typeTag === 'applianceTags') {
            selectedApplianceTags.splice(selectedApplianceTags.findIndex((appliance) => appliance === label), 1);
        } else if (typeTag === 'ustensilsTags') {
            selectedUstensilsTags.splice(selectedUstensilsTags.findIndex((ustensil) => ustensil === label), 1);
        }
        filterRecipes();
        let node = event.target.parentNode;
        node.parentNode.removeChild(node)
    });
}

function init() {
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            if (!globalListIngredients.includes(ingredient.ingredient.toLowerCase())) {
                globalListIngredients.push(ingredient.ingredient.toLowerCase());

            }
        })
        if (!globalListAppliance.includes(recipe.appliance.toLowerCase())) {
            globalListAppliance.push(recipe.appliance.toLowerCase());
        }

        recipe.ustensils.forEach((ustensil) => {
            if (!globalListUstensil.includes(ustensil.toLowerCase())) {
                globalListUstensil.push(ustensil.toLowerCase());

            }
        })
    });

    displayRecipe(recipes);
    displayIngredients(globalListIngredients);
    displayAppliance(globalListAppliance);
    displayUstensils(globalListUstensil);
    searchFilter();
    tagEvent();
    filterIngredientsByIngredientsBloc();
    filterApplianceByApplianceBloc();
    filterUstensilByUstensilesBloc();
};

init();

