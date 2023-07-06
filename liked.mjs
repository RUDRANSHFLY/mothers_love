const love_div = document.querySelector(".mothers_love");
const pro = document.querySelector(".process");
const likeFetch = async (likes) => {
    love_div.innerHTML="";
    
    
    
    try{
            let i = 0 ;
            while(i < likes.length){
                const like = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${likes[i]}`);
                const mother_like = await like.json();
                mother_like.meals.forEach(m => {
                const meal_div = document.createElement('div');
                meal_div.id = likes[i];
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
                like.innerHTML='<i class="fa-solid fa-heart"></i>';
                like.classList.add('liked');
                div_b.appendChild(like);
                const but = document.createElement('button');
                but.classList.add('but');
                but.textContent = "View Recipe";
                div_b.appendChild(but);
                meal_div.appendChild(div_b);
        
                like.addEventListener("click",()=>{
                       var g = likes[i] ;
                       likes.pop(g);
                       meal_div.style.display = "none";
                       return likes;
                    });
        
                but.addEventListener("click",()=>{
                    love_div.style.position = "fixed";
                    love_Popeup(m);
                });




                pro.innerHTML="";
                love_div.appendChild(meal_div) ;
                });
            i++;
            };
        }catch{

    }
};


export {likeFetch};