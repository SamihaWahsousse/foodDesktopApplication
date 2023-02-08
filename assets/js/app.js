let searchBtn           = document.getElementById("search_btn");

searchBtn.addEventListener("click", getMeals);

async function getMeals(){

    let mealSearch  = document.getElementById("searchInput").value;
    let urlAPI   = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealSearch;

    const apiFetch = await fetch(urlAPI)
    const apiResult = await apiFetch.json()

    console.log(apiResult);
 
}