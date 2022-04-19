function recipesFactory(data) {
    const {id, name, servings, ingredients, time, description, appliance, ustensils} = data;

    function getRecipeCardDOM() {
        const article = document.createElement('article');
        article.classList.add('card');
        const recipeImg = document.createElement('img');
        recipeImg.classList.add('card-img')
        const nom = document.createElement('p');
        nom.classList.add('name');
        nom.textContent = name;
        const timeBloc = document.createElement('div');
        timeBloc.classList.add('timeBloc');
        const timeIcon = document.createElement('i');
        timeIcon.classList.add('timeIcon', 'far', 'fa-clock');
        const timeToRecipe = document.createElement('p');
        timeToRecipe.classList.add('timeToRecipe');
        timeToRecipe.textContent = time + ' min';
        const ingredientsRecipe = document.createElement('p');
        ingredientsRecipe.classList.add('ingredientsRecipe');
        data.ingredients.forEach((ingredient) => {
            const ingredientRecipe = document.createElement('span');
            ingredientRecipe.classList.add('ingredientRecipe');
            ingredientRecipe.textContent += `${ingredient.ingredient} ${ingredient.quantity?":":""} ${ingredient.quantite?":":""} ${ingredient.quantity || ""} ${ingredient.quantite || ""} ${ingredient.unit || ""}`
            ingredientsRecipe.appendChild(ingredientRecipe);
        })
        const descriptionRecipe = document.createElement('p');
        descriptionRecipe.classList.add('descriptionRecipe');
        descriptionRecipe.textContent = description;

        article.appendChild(recipeImg);
        article.appendChild(nom);
        timeBloc.appendChild(timeIcon)
        timeBloc.appendChild(timeToRecipe);
        article.appendChild(timeBloc)
        article.appendChild(ingredientsRecipe);
        article.appendChild(descriptionRecipe);

        return (article);
    }



    return {id, name, servings, ingredients, time, description, appliance, ustensils, getRecipeCardDOM};
}


