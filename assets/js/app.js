//Récuperer les élements du DOM et les stocker dans des variables
let searchBtn = document.getElementById("formSearch");
let userInput = document.getElementById("searchInput");
let btnEmpty = document.formMealSearch.myButton.value;
let foodImage = document.querySelector("[data-food-image]");
const foodName = document.querySelector("[data-food-name]");

const foodCardTemplate = document.querySelector(
	"[data-food-template]"
);
const foodCardContainer = document.querySelector(
	"[data-food-cards-container]"
);
const foodRecepie = document.querySelector("[data-food-recepie]");
const ingredientsContainer = document.querySelector(
	"[modal-ingredients-container]"
);
const ingredientDetailTemplate = document.querySelector(
	"[modal-ingredient-detail]"
);

//ajouter listener sur le bouton de search
searchBtn.addEventListener("submit", (e) => {
	e.preventDefault();
	let searchInput = userInput.value;
	getMeals(searchInput);
	userInput.value = "";
});

// fetch de l'API themealdb
async function getMeals(searchInput) {
	let urlAPI = ` https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
	const apiFetch = await fetch(urlAPI);
	const apiResult = await apiFetch.json();

	foodCardContainer.innerHTML = "";
	//A loop for each meal from the API fetch : each meal is an object with attributes
	apiResult.meals.forEach((meal) => {
		// use the html template to add html elements and extract "meal" attributes into it "foodName->strMeal","meal Image-> strMealThumb"
		const foodCard = foodCardTemplate.content
			.cloneNode(true)
			.querySelector("div");
		foodCard
			.querySelector("img")
			.setAttribute("src", meal.strMealThumb);
		foodCard.querySelector("div.card-body > .card-title").innerText =
			meal.strMeal;
		//store the meal id and add it as an attribute in the button "food Recipe"

		foodCard
			.querySelector("div.card-body > button")
			.setAttribute("id", meal.idMeal);
		foodCardContainer.append(foodCard);
	});

	//Retrieve the modal
	let showModalBtns = document.getElementsByName("showModalButton");

	//loop for all the modal buttons after the meal search
	for (var i = 0; i < showModalBtns.length; i++) {
		showModalBtns[i].addEventListener("click", (e) => {
			//store the meal id in a new variable
			let idMeall = e.target.id;

			// Loop for the result of API fetch with a "break" if we find the searched meal.
			for (let j = 0; j < apiResult.meals.length; j++) {
				let foodItem = apiResult.meals[j];

				//Add meal name and ingredients in the modal
				document.querySelector("[modal-food-title]").innerText =
					foodItem.strMeal;
				if (idMeall == foodItem.idMeal) {
					ingredientsContainer.innerHTML = "";
					//Loop mesure and ingredient for each meal selected with food recipe button
					for (let i = 1; i <= 20; i++) {
						if (
							foodItem[`strMeasure${i}`] &&
							foodItem[`strIngredient${i}`]
						) {
							document
								.querySelector("[meal-image]")
								.setAttribute("src", foodItem["strMealThumb"]);
							const ingredientDetail =
								ingredientDetailTemplate.content
									.cloneNode(true)
									.querySelector("div");
							ingredientDetail
								.querySelector("img")
								.setAttribute(
									"src",
									"https://www.themealdb.com/images/ingredients/" +
										foodItem[`strIngredient${i}`] +
										".png"
								);
							ingredientDetail
								.querySelector("img")
								.setAttribute("alt", foodItem[`strIngredient${i}`]);
							ingredientDetail.querySelector("figcaption").innerText =
								foodItem[`strMeasure${i}`] +
								" " +
								foodItem[`strIngredient${i}`];
							ingredientsContainer.append(ingredientDetail);
							document.querySelector(
								"#meal-instruction-detail > p"
							).innerText = foodItem.strInstructions;
							document
								.querySelector("[youtube-link]")
								.setAttribute("href", foodItem.strYoutube);
						} else {
							break;
						}
					}
					break;
				}
			}
		});
	}
}
