"use strict";
const order = document.querySelector(".text");
const startBtn = document.querySelector(".start");
const serveBtn = document.querySelector(".serve");
const ingredients = document.querySelectorAll(".ingredients");
const prepare = document.querySelector(".prepare");
const time_bar = document.querySelector(".time_bar");
const score = document.querySelector("span");
const prev_result = document.querySelector(".prev_result");
let totalScore = 0;
score.innerHTML = `${totalScore}`;
let timer = 100;
time_bar.style.width = `${timer}%`;
let timerInterval;
const dishes = [
    {
        dish: "Toast 🍞",
        ingredients: ["🍞", "🧈"]
    },
    {
        dish: "Salad 🥗",
        ingredients: ["🥬", "🥕", "🥒"]
    },
    {
        dish: "Hot Dog 🌭",
        ingredients: ["🌭", "🍞", "🧅"]
    },
    {
        dish: "Pizza 🍕",
        ingredients: ["🍞", "🍅", "🧀"]
    },
    {
        dish: "Pasta 🍝",
        ingredients: ["🍝", "🍅", "🧀", "🌿"]
    },
    {
        dish: "Burger 🍔",
        ingredients: ["🥩", "🍞", "🧀", "🍅", "🥬"]
    },
    {
        dish: "Taco 🌮",
        ingredients: ["🌮", "🥩", "🧀", "🥬", "🍅"]
    },
    {
        dish: "Sushi 🍣",
        ingredients: ["🍚", "🐟", "🥢", "🥑", "🍋"]
    },
    {
        dish: "Ramen 🍜",
        ingredients: ["🍜", "🥩", "🥚", "🌿", "🧄", "🧅"]
    },
    {
        dish: "Feast 🍽️",
        ingredients: ["🍗", "🍖", "🍞", "🍷", "🥗", "🧁", "🍇"]
    }
];
// SHOW PREVIOUS RESULT
function showPrevResults() {
    // @ts-ignore
    const getScore = JSON.parse(localStorage.getItem("PlayerScore"));
    prev_result.innerHTML += `<p>${getScore}</p>`;
}
//  timer
function setTimer() {
    clearInterval(timerInterval);
    timer = 100;
    time_bar.style.width = `${timer}%`;
    timerInterval = setInterval(function () {
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("GAME OVER!");
            //     save score
            const PlayerScore = totalScore;
            localStorage.setItem('PlayerScore', JSON.stringify(PlayerScore));
            startBtn.style.display = "block";
            serveBtn.style.display = "none";
            prepare.innerHTML = "";
            showPrevResults();
            return;
        }
        else {
            timer -= 10;
            time_bar.style.width = `${timer}%`;
            console.log(timer);
        }
    }, 1000);
}
// START and SERVE buttons
let randIndex = Math.floor(Math.random() * 10);
let makeOrder = [];
startBtn.onclick = () => {
    totalScore = 0;
    score.innerHTML = `${totalScore}`;
    order.innerHTML = `
    <h2>${dishes[randIndex].dish}</h2>
    <div class="order_ingredients">${dishes[randIndex].ingredients}</div>
    `;
    startBtn.style.display = "none";
    serveBtn.style.display = "block";
    // @ts-ignore
    makeOrder = [...dishes[randIndex].ingredients];
    console.log(dishes[randIndex].ingredients);
    console.log(makeOrder);
    //  timer
    setTimer();
};
let checkIngredients = [];
serveBtn.onclick = () => {
    //  timer
    setTimer();
    randIndex = Math.floor(Math.random() * 10);
    if (checkIngredients.length === makeOrder.length &&
        checkIngredients.every((value, index) => value === makeOrder[index])) {
        totalScore += 10;
        score.innerHTML = `${totalScore}`;
        checkIngredients = [];
        prepare.innerHTML = "";
        order.innerHTML = "";
        order.innerHTML = `
    <h2>${dishes[randIndex].dish}</h2>
    <div class="order_ingredients">${dishes[randIndex].ingredients}</div>
    `;
        makeOrder = [];
        makeOrder = [...dishes[randIndex].ingredients];
        console.log("good");
    }
    else {
        console.log("bad");
        console.log("checkIngredients:", checkIngredients);
        console.log("makeOrder:", makeOrder);
    }
};
// Click on ingredients
ingredients.forEach(ingredient => {
    ingredient.onclick = () => {
        if (startBtn.style.display === "block") {
            return;
        }
        else {
            prepare.innerHTML += `
        <div class="dish">${ingredient.textContent}</div>
        `;
            // @ts-ignore
            checkIngredients.push(ingredient.textContent);
            console.log(checkIngredients);
        }
    };
});
