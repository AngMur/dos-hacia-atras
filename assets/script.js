hideAllScreens();

const start = document.getElementById("start");
const count = document.getElementById("count");
const game = document.getElementById("game");
const result = document.getElementById("result");
const help = document.getElementById("help");

const countNumber = document.getElementById("count__number");
const gameNumber = document.getElementById("game__number");
const resultCorrect = document.getElementById("result__correct");
const resultExtend = document.getElementById("result__extend");

let index /*= 0*/;
const extend = 15;

let list /*= generateList(extend)*/;
let results /*= getAnswers(list)*/;
let emptyList/* = new Array(extend)*/;


showScreen(start);

function showScreen(screen){
    screen.style.display = "block"
}

function hideAllScreens() {
    let screens = document.querySelectorAll('.screen');
    screens.forEach(function(screen) {
      screen.style.display = 'none';
    });
}

function startGame(){
    hideAllScreens();
    showScreen(count);
    countNumber.innerText = 3;
    
    //Countdown
    setTimeout(function() {
        const countdown = setInterval(function() {
            countNumber.innerText = parseInt(countNumber.innerText) - 1;
            if (parseInt(countNumber.innerText) === 0) {
                clearInterval(countdown);
                showNumbers();
            }
        }, 1000);
    }, 500);
}

function generateList(length){
    const list = []
    for (let i = 0; i < length; i++) {
        list.push(Math.floor(Math.random() * 4) + 1);
    }
    return list;
}

function getAnswers(list){
    let results = [];
    for (let i = 0; i < list.length; i++) {
        if(list[i] == list[i - 3]){
            results.push(true);
        } else{
            results.push(false);
        }  
    }
    return results;
}

function saveAnswer(value){
    if(emptyList[index] === undefined){
        emptyList[index] = value; 
    }
}

function showNumbers(){
    hideAllScreens();

    index = 0;
    list = generateList(extend);
    results = getAnswers(list);
    emptyList = new Array(extend);
    
    gameNumber.innerText = list[index];

    showScreen(game);

    setTimeout(function(){
        const setNumber = setInterval(function(){
            gameNumber.style.opacity = 0;
            setTimeout(function(){
                gameNumber.innerText = list[index];
                gameNumber.style.opacity = 1
                if(index < list.length - 1){
                    index++;
                } else{
                    clearInterval(setNumber);
                    showResults();
                }
            }, 500);
        }, 2000);
    }, 100);

}

function showResults(){
    hideAllScreens();

    let coincidentes = 0;

    for (let i = 0; i < results.length && i < emptyList.length; i++) {
        if (results[i] === emptyList[i]) {
            coincidentes++;
        }
}
    resultCorrect.innerText = coincidentes;
    resultExtend.innerText = extend;

    console.log(list);
    console.log(results);
    console.log(emptyList);

    showScreen(result);
}

function showHelp(){
    hideAllScreens();
    showScreen(help);
}

function showStart(){
    hideAllScreens();
    showScreen(start);
}