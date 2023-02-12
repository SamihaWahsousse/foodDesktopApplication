let searchBtn           = document.getElementById("formSearch");
let userInput           = document.getElementById("searchInput");
let btnEmpty            = document.formMealSearch.myButton.value;
let foodImage           = document.querySelector("[data-food-image]");
const foodName          = document.querySelector("[data-food-name]");   
const foodCardTemplate  = document.querySelector("[data-food-template]");
const foodCardContainer = document.querySelector("[data-food-cards-container]");
const foodRecepie       = document.querySelector("[data-food-recepie]");

const ingredientsContainer = document.querySelector("[modal-ingredients-container]");
const ingredientDetailTemplate = document.querySelector("[modal-ingredient-detail]");


searchBtn.addEventListener("submit", (e)=>{
    e.preventDefault();
let searchInput     = userInput.value;
getMeals(searchInput);
userInput.value ="";
});

async function getMeals(searchInput){
    let urlAPI   =` https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    const apiFetch = await fetch(urlAPI)
    const apiResult = await apiFetch.json()
    //array meals []console.log(apiResult);
    let modalMealName       = document.getElementById("staticBackdropLabel");
    foodCardContainer.innerHTML="";
    console.log(apiResult.meals[0]);
    apiResult.meals.forEach ((meal) => {
   //console.log(meal);
    const foodCard = foodCardTemplate.content.cloneNode(true).querySelector("div");
    foodCard.querySelector("img").setAttribute("src",meal.strMealThumb);
    foodCard.querySelector("div.card-body > .card-title").innerText = meal.strMeal; 
    //add meal name + ingredients in the modal 
    // foodCard.querySelector("div.card-body > a").setAttribute("title", meal.strMeal); 
    foodCard.querySelector("div.card-body > a").setAttribute("id", meal.idMeal);
    foodCardContainer.append(foodCard);  
    //console.log(foodCard);
 
});

    let showModalBtns        = document.getElementsByName("showModalButton");
    let modalTitle           = document.getElementById("staticBackdropLabel");
    for (var i=0; i < showModalBtns.length; i++) {
        showModalBtns[i].addEventListener("click", (e)=>{
            //alert(e.target.id);
          //  alert("test" +.strIngredient2);
            let idMeall             = e.target.id;

           // apiResult.meals.forEach(foodItem => {

            // Remplacement d'une boucle foreach par une bouclke for pour pouvoir faire un break si la recette est trouvée.
            for(let j = 0; j < apiResult.meals.length ; j++)
            {   
                let foodItem = apiResult.meals[j];
                console.log(foodItem);
                if (idMeall == foodItem.idMeal){
                    ingredientsContainer.innerHTML = "";
                    for(let i=1;i<=20;i++){
                        if (foodItem[`strMeasure${i}`] && foodItem[`strIngredient${i}`])
                        {
                            console.log(" Ingredients et mesure: "+foodItem[`strMeasure${i}`]+" "+foodItem[`strIngredient${i}`]);                            
                            document.querySelector("[meal-image]").setAttribute("src", foodItem["strMealThumb"]);
                            const ingredientDetail = ingredientDetailTemplate.content.cloneNode(true).querySelector("div");
                            ingredientDetail.querySelector("img").setAttribute("src", "https://www.themealdb.com/images/ingredients/" + foodItem[`strIngredient${i}`] +".png");
                            ingredientDetail.querySelector("img").setAttribute("alt", foodItem[`strIngredient${i}`]);
                            ingredientDetail.querySelector("figcaption").innerText = foodItem[`strMeasure${i}`] + " " + foodItem[`strIngredient${i}`];
                            ingredientsContainer.append(ingredientDetail);
                            document.querySelector("#meal-instruction-detail > p").innerText = foodItem.strInstructions;
                            document.querySelector("[youtube-link]").setAttribute("href", foodItem.strYoutube);
                            document.querySelector("[youtube-link]").innerText = foodItem.strYoutube;
                        }
                        else {
                            break;
                        }
                    }
                    break;
                }
            }

    });
}

}

// à partir de l'id Meal 
//récuperer les meal name 
// récupérer les ingredients de chaque meal 
//récupérer les quantités de chaque ingrédient 
//récuperer les photos de chaque ingrédient






/*
async function getAllMeals(){
    let urlAPIAllFood   =` https://www.themealdb.com/api/json/v1/1/search.php?s=`
    const apiAllFetch   = await fetch(urlAPIAllFood)
    const apiAllResult  = await apiAllFetch.json()
    console.log(apiAllResult);

}

document.getElementById
searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();
   getMeals();
   });
getAllMeals();*/