let addIngredientsBtn = document.getElementById("addIngredientsBtn");
let ingredientList = document.getElementById(".ingredientList");
let ingredientDiv = document.createElement(".ingredientDiv")[0];

addIngredientsBtn.addEventListener("click", function () {
  let newIngredients = ingredientList.cloneNode(true);
  let input = newIngredients.getElementByTagName("input")[0];
  input.value = "";
  ingredientList.appendChild(newIngredients);
});
