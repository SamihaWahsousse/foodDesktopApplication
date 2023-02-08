let searchBtn           = document.getElementById("search_btn");
let userInput           = document.getElementById("searchInput");

let foodImage           = document.querySelector("[data-food-image]");
const foodName          = document.querySelector("[data-food-name]");   

const foodCardTemplate  = document.querySelector("[data-food-template]");
const foodCardContainer = document.querySelector("[data-food-cards-container]");


searchBtn.addEventListener("click", ()=>{
let searchInput     = userInput.value;
getMeals(searchInput);
userInput.value ="";
})


async function getMeals(searchInput){
    let urlAPI   =` https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    console.log(urlAPI);

    const apiFetch = await fetch(urlAPI)
    const apiResult = await apiFetch.json()
    console.log(apiResult);

   
   apiResult.meals.forEach ((meal) => {
    // if(valueInput == meal.strMeal){
    const foodCard = foodCardTemplate.content.cloneNode(true).querySelector("div");
    foodCard.querySelector("img").setAttribute("src",meal.strMealThumb);
    foodCard.querySelector("div.card-body > .card-title").innerText = meal.strMeal; 
    foodCardContainer.innerHTML="";
    foodCardContainer.append(foodCard); 
  
    
        //else {
           // console.log("check ur search name");
        
  //console.log(foodCard);
  // console.log(foodCard);
  // console.log(meal);
  // console.log(foodCard);  

});
}

 
