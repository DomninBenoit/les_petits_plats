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
        lienIngredient.addEventListener('click', () => filterRecipes());
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
        lienAppliances.addEventListener('click', () => filterRecipes());
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
        lienUstensil.addEventListener('click', () => filterRecipes());
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

function tagEventCreator(event, typeTag) {
    const tagList = document.getElementById("tagList");
    for (let i = 0; i < event.length; i++) {
        event[i].addEventListener("click", (e) => {
            let text = e.target.innerText;
            const tag = `<button type="button" class="${typeTag}Btn">
      <span class="tag ${typeTag}">${text}</span><i class="far fa-times-circle"></i></button>`
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
    filterApplianceByApplianceBloc();
};

init();

