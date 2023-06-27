const search_box = document.querySelector(".search_box")
const search_button = document.querySelector(".search_button");
const love_div = document.querySelector(".mothers_love");
const pro = document.querySelector(".process");
const love_detail = document.querySelector(".love_detail");
const love_close = document.querySelector(".love_close");
const meal_detail = document.querySelector(".meal_detail");





const loveFetch = async (love_name) => {

    pro.innerHTML= "<h2>Fetching the Recipe..........</h2>";
    const love = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${love_name}`);
    const mother_love = await love.json();
    
    pro.innerHTML= "";
    mother_love.meals.forEach(m => {
        const meal_div = document.createElement('div');
        meal_div.classList.add('love_meal');
        meal_div.innerHTML =  
        `
            <img src="${m.strMealThumb}" >
            <h3> ${m.strMeal}</h3> 
            <p> ${m.strArea} Dish</p>
            <p>Belongs to ${m.strCategory} Category</p>
            
        `
        const but = document.createElement('button');
        but.classList.add("but");
        but.textContent = "View Recipe";
        meal_div.appendChild(but);

        but.addEventListener("click",()=>{
            love_Popeup(m);
        });

      
        love_div.appendChild(meal_div);
    });
    
    
} 


const love_Popeup = (m) => {
    meal_detail.innerHTML = 
    `
    <h2>${m.strMeal}</h2>
    `
    meal_detail.parentElement.style.display = "block" ; 
}


search_button.addEventListener('click',(e)=>{
    e.preventDefault();
    const love_name = search_box.value.trim();
    loveFetch(love_name);
});