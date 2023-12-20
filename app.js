let ele;

async function special() {
    try {
        const api = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const info = await api.json();
        const mealInfo = info.meals[0];
        const imageUrl = mealInfo.strMealThumb;
        const imageName = mealInfo.strMeal;
        ele = mealInfo.idMeal
        return { imageUrl, imageName };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

function update(imageUrl, imageName) {
    const foodImage = document.getElementById('food-image');
    const foodName = document.getElementById('food-name');
    foodImage.src = imageUrl;
    foodName.innerHTML = imageName;
}

async function reload() {
    try {
        const { imageUrl, imageName } = await special();
        update(imageUrl, imageName);
    } catch (error) {
        console.error('Error reloading data:', error);
    }
}

window.onload = reload;

async function search() {
    const inputBox = document.getElementById('search').value;
    const API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputBox}`;

    try {
        const api = await fetch(API);
        const info = await api.json();
        display(info.meals);
    } catch (error) {
        console.error("There's an error:", error);
    }
}

function display(meals) {
    const results = document.getElementById('main');
    results.innerHTML = '';

    meals.forEach(meal => {
        const image = document.createElement('img');
        image.src = meal.strMealThumb;

        const name = document.createElement('p');
        name.textContent = meal.strMeal;

        const resultContainer = document.createElement('div');
        resultContainer.appendChild(image);
        resultContainer.appendChild(name);

        results.appendChild(resultContainer);
    });
}

// Add an event listener to the search icon
document.querySelector('.icon').addEventListener('click', search);


// modal
const modal = document.getElementById("food-name");
const upper = document.querySelector(".upper"); // Use . to select by class

modal.onclick = () => {
    GetList(ele)
    upper.style.display = "flex";
};

const cross = document.getElementById("cross");
cross.addEventListener("click", () => {
    upper.style.display = "none";
});

const list = document.getElementById("list");
async function GetList(ele){
    list.innerHTML = "";
    try{
        let response = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ele}`)
        let data = await response.json();
        // console.log(data.meals[0])
        for(let i=1;i<21;i++){
            if(data.meals[0][`strIngredient${i}`]!=""){
                let x = data.meals[0][`strIngredient${i}`]
                console.log(x)
                list.innerHTML += `<li>${x}</li>`
            }

        }
    }
    catch(error){
        console.log("Cannot access the Data:",error);
    }
}
