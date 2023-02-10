let searchBtn           = document.getElementById("formSearch");
let userInput           = document.getElementById("searchInput");
let btnEmpty            = document.formMealSearch.myButton.value;

let foodImage           = document.querySelector("[data-food-image]");
const foodName          = document.querySelector("[data-food-name]");   

const foodCardTemplate  = document.querySelector("[data-food-template]");
const foodCardContainer = document.querySelector("[data-food-cards-container]");
const foodRecepie       = document.querySelector(("[data-food-recepie]"));


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
    console.log(apiResult);
    let modalMealName       = document.getElementById("staticBackdropLabel");
    foodCardContainer.innerHTML="";
   apiResult.meals.forEach ((meal) => {
    console.log(meal);
    const foodCard = foodCardTemplate.content.cloneNode(true).querySelector("div");
    foodCard.querySelector("img").setAttribute("src",meal.strMealThumb);
    foodCard.querySelector("div.card-body > .card-title").innerText = meal.strMeal; 
    //add meal name + ingredients in the modal 
    // foodCard.querySelector("div.card-body > a").setAttribute("title", meal.strMeal); 
    foodCard.querySelector("div.card-body > a").setAttribute("id", meal.idMeal);
    foodCardContainer.append(foodCard);  
    console.log(foodCard);
 
});

    let showModalBtns        = document.getElementsByName("showModalButton");
    let modalTitle           = document.getElementById("staticBackdropLabel");
    for (var i=0; i < showModalBtns.length; i++) {
        showModalBtns[i].addEventListener("click", (e)=>{
            //alert(e.target.id);
          //  alert("test" +.strIngredient2);
            let idMeall             = e.target.id;
            let foodIngredients     = [];
            let compteurIngredients = 1;

            apiResult.meals.forEach(foodItem => {
                if (idMeall == foodItem.idMeal){
                    let ingredient = "" ;
                    let measure    = "";
                    if(foodItem.startsWith("strIngredient") ){

                    }
                    alert("recuperer tab food "+ foodItem.strArea);


                }
            
                
            });

            console.log(idMeall);
            modalTitle.innerHTML=idMeall;
       // modalTitle.innerHTML = 'Food Name : ' + e.target.title;
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