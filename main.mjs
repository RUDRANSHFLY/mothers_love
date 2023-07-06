const search_box = document.querySelector(".search_box")
const search_button = document.querySelector(".search_button");
const love_div = document.querySelector(".mothers_love");
const pro = document.querySelector(".process");
const love_detail = document.querySelector(".love_detail");
const love_close = document.querySelector(".love_close");
const meal_detail = document.querySelector(".meal_detail");
const likes_button = document.querySelector(".saved");
import { likeFetch } from "./liked.mjs";


const likes = [] ;

likes_button.addEventListener("click",(e)=>{
    likeFetch(likes);
    e.preventDefault();
});






const loveFetch = async (love_name) => {

    try{
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
        const div_b = document.createElement('div');
        div_b.classList.add('div_flex');
        const like = document.createElement('button');
        if(likes.includes(m.idMeal)){
            like.innerHTML='<i class="fa-solid fa-heart"></i>';
        }else{
            like.innerHTML='<i class="fa-regular fa-heart fa-beat"></i>';
        }
        like.classList.add('liked');
        div_b.appendChild(like);
        const but = document.createElement('button');
        but.classList.add('but');
        but.textContent = "View Recipe";
        div_b.appendChild(but);
        meal_div.appendChild(div_b);

        like.addEventListener("click",()=>{
            if(likes.includes(m.idMeal)){
                like.innerHTML='<i class="fa-regular fa-heart fa-beat"></i>';
                like.classList.remove('liked_button');
                likes.pop(m.idMeal);
                 return ;
            }else{
                likes.push(m.idMeal);
                like.innerHTML='<i class="fa-solid fa-heart"></i>';
                like.classList.add('liked_button');
                return ;
            }
        });

        but.addEventListener("click",()=>{
            love_div.style.position = "fixed";
            love_Popeup(m);
        });

      
        love_div.appendChild(meal_div);
    });
    }catch(error){
        pro.innerHTML =
        `
        <h2>Error in Fetching Recipie </h2>
        `
        pro.classList.add('error');
        return;
    }
    
    
} 


/**
 * 
 * ! this function is used to get the details about the recipe 
 */
const fetchIngredents = (meal) =>{
    console.log(meal);
    let ingredentsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredent = meal[`strIngredient${i}`];
        console.log(ingredent);
        if(ingredent){
            const measure = meal[`strMeasure${i}`];
            ingredentsList += `<li class="list">${measure} ${ingredent}</li>`;
            console.log(ingredentsList);
        }
        else {
            break;
        }
        
    }
    return ingredentsList;
}

const love_Popeup = (m) => {

    meal_detail.innerHTML = 
    `
    <h2 class="loveName">
        ${m.strMeal}
    </h2>
    
    <h3 class="lovelisth3">
        Ingredents :
    </h3>
    
    <ul class="loveList">
        ${fetchIngredents(m)}
    </ul>
    
    <div class="loveInstruction">
        <h3>
            Instructions :
        </h3>
        <p>
            ${m.strInstructions}
        </p>
    </div>

    ` 
    meal_detail.parentElement.style.display = "block" ; 
}



love_close.addEventListener('click',()=> {
    meal_detail.parentElement.style.display = "none";
    love_div.style.position = "initial";

});

search_button.addEventListener('click',(e)=>{
    
    pro.classList.remove('error');
    pro.classList.remove('emptySearch');
    love_div.innerHTML="";
    e.preventDefault();
    const love_name = search_box.value.trim();
    if(!love_name){
        pro.innerHTML =
        `
        <h2>Type the meal in SerachBox </h2>
        `
        pro.classList.add('emptySearch');
        return;
    }
    loveFetch(love_name);
    search_box.value = "";
});