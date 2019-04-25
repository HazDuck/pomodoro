//links html elements to js var's
const start = document.getElementById("start-button");
const pause = document.getElementById("pause-button");
const restart = document.getElementById("restart-button");
const pomodoroValue = document.getElementById("pomodoro");
const restValue = document.getElementById("restVaue");
const reset = document.getElementById("reset-button");
let session = document.getElementById("session-length").value;
const rest = document.getElementById("rest-length").value;
const minutesNumber = document.getElementById("minutes-number");
const secondsNumber = document.getElementById("seconds-number");
const counterNumber = document.getElementById("counter-number");
const resetCounter = document.getElementById("reset-counter");
const increaseSession = document.getElementById("increase-session");
const decreaseSession = document.getElementById("decrease-session");
const increaseRest = document.getElementById("increase-rest");
const decreaseRest = document.getElementById("decrease-rest");
const goalInput = document.getElementById("goal-input").value;
const goalButton = document.getElementById("goal-button");
const goalText= document.getElementById("goal-text");

//global var to access secondsleft etc
let time=Date.now();
let countdown;
let now;
let then;
let playTime;
let pauseTime;
let pausedTime;
let finishTime;
let paused= false;
let startTimer=false;
let sessionNumber;
let updatedSessionNumber;
let pomodoro = 25;
let rPomodoro = 5;
let sessionVsRest=1;
let goalNumber;

//page loads and timer shows x mins
minutesNumber.textContent= pomodoro;
pomodoroValue.textContent= pomodoro;
restValue.textContent= rPomodoro;
//sets the effect of each clicked button
start.addEventListener("click", function() {
    toggleStart(startClock);
});
pause.addEventListener("click", pauseClock);
//restart.addEventListener("click", restartClock);
reset.addEventListener("click", startClock);
goalButton.addEventListener("click", function() {
    setGoal();
    hidetext(".goal")
});

//allows user to enter minutes in a text fields for session or rest
$("document").ready(function() {
  $("#session-length").keyup(function(x){
   if (x.keyCode === 13){
    pomodoro = document.getElementById("session-length").value;
    pomodoroValue.innerHTML= pomodoro;
    startClock();
    }
  })}
)
$("document").ready(function() {
  $("#rest-length").keyup(function(x){
   if (x.keyCode === 13){
    rPomodoro = document.getElementById("rest-length").value;
    restValue.innerHTML= rPomodoro;
    }
  })}
)
//increase/decrease by a singe minute for session and rest
increaseSession.addEventListener("click", function() {
    if (!startTimer) {
        pomodoro++;
        minutesNumber.innerHTML= pomodoro;
        secondsNumber.innerHTML= 0;
        pomodoroValue.innerHTML= pomodoro;
        clearInterval(countdown);
    }
    else {
        return;
    }
})
decreaseSession.addEventListener("click", function() {
    if (pomodoro <= 0) {
        pomodoro = 1
    };
    if (!startTimer) {
        pomodoro--;
        minutesNumber.innerHTML= pomodoro;
        secondsNumber.innerHTML= 0;
        pomodoroValue.innerHTML= pomodoro;
        clearInterval(countdown);
    }
    else {
        return;
    }
})
increaseRest.addEventListener("click", function() {
    if (!startTimer) {
        rPomodoro++;
        restValue.innerHTML= rPomodoro;
        clearInterval(countdown);
    }
    else {
        return;
    }
})
decreaseRest.addEventListener("click", function() {
    if (rPomodoro <= 0) {
        rPomodoro = 1
    };
    if (!startTimer) {
        rPomodoro--;
        restValue.innerHTML= rPomodoro;
        clearInterval(countdown);
    }
    else {
        return;
    }
})
//reset the total number of session counter
resetCounter.addEventListener("click", function() {
        counterNumber.innerHTML = 0;
    }
)

function startClock() {
    //stops previous counting down
    clearInterval(countdown);
    //ensure pause button is reset
    //pause.innerHTML = "Pause";
    paused=false;
    //sets startTimer to true so that counter can incrase when secs=0 on a session and not a break
    startTimer=true;
    //starts timer function
    timer(pomodoro*60)
};

function timer(secs) {
//sets up time in miliseconds now and what the total number of secs will be in miliseconds * 1000 = seconds
    now = Date.now();
    then = now+secs * 1000;
    //shows time on the first second before the interval kicks in
    showTime(Math.round(secs));
    //works out number of seconds remaining each second
    countdown = setInterval(function(){
        const secondsLeft = Math.round((then - Date.now())/1000);
        //if (secondsNumber.value<10) {
        //console.log("soy");
        //}
        //stops clock at 0
        if (secondsLeft < 0) {
            clearInterval(countdown);
            startTimer=false;
            alert("Hello I am an alert")
            //toggles between session and break timers
            if (sessionVsRest==1) {
                startBreak();
            }
            else if (sessionVsRest==0){
                startSession();
            }
            return;
        }
        //calls showTime
        showTime(secondsLeft);
        //counter incremental increases
        if ((secondsLeft == 0)&&(startTimer)) {
            counterNumber.innerHTML++;
        }
        congrats
    },1000);
}
//splits seconds in minutes and remaining seconds and displays every second
function showTime(secs) {
    const minutes = Math.floor(secs/60);
    const seconds = secs % 60;
    // minutesNumber.innerHTML = minutes;
    if (minutes<10){
        minutesNumber.innerHTML = "0"+minutes;
    }
    else {minutesNumber.innerHTML = minutes
    };
    if (seconds<10){
        secondsNumber.innerHTML = "0"+seconds;
    }
    else {secondsNumber.innerHTML = seconds
    };
}

//pauses clock
function pauseClock() {
    if (!paused) {
        pauseTime = Date.now();
        clearInterval(countdown);
        pause.innerHTML = "Paused";
        paused = true;
        startTimer=false;
    }
}
//restarts clock after a pause
function restartClock() {
    if (paused) {
        playTime = Date.now();
        pausedTime = (playTime-pauseTime);
        finishTime = Math.round((pausedTime+then)-Date.now())/1000;
        timer(finishTime);
        pause.innerHTML = "Pause";
        paused=false
    }
    return;
};
//starts a timer for a session
function startSession() {
    sessionVsRest=1;
    timer(pomodoro*60);
    startTimer=true;
};
//starts a timer for a break
function startBreak() {
    sessionVsRest=0;
    timer(rPomodoro*60);
};

function setGoal(){
    goalText.innerHTML = document.getElementById("goal-input").value;
}
function hidetext(y){
    $(y).hide()
};

function congrats(x, y){
    if (x==y) {
        console.log("congrats");
        //document.getElementById("congrats").style.display="block";
    }
}

function toggleStart(x){
    if (paused) {
        restartClock();
        return;
    }
    else {
        x();
        return;}
}