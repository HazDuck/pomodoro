function timer(secs) {
    console.log("start-timer");
    finishTime = Date.now() + secs * 1000;
    countdown = setInterval(function() {
        let secondsLeft = Math.round((finishTime - Date.now()) / 1000);
        showTime(secondsLeft);
    },1000)
}

function showTime(secondsLeft) {
    let secondsNumber = document.getElementById("seconds-number");
    if (secondsLeft > 0) {
        let minutes = Math.floor(secondsLeft / 60);
        let seconds = secondsLeft % 60;
        let minutesNumber = document.getElementById("minutes-number");
        if (minutes < 10) {
            minutesNumber.textContent = "0" + minutes;
        } else {
            minutesNumber.textContent = minutes
        }
        if (seconds < 10) {
            secondsNumber.textContent = "0" + seconds;
        } else {
            secondsNumber.textContent = seconds;
        }
    } else if (secondsLeft === 0) {
        secondsNumber.textContent = "00"
        if (!resting) {
            restClock();
        } else {
            workClock()
        }
    }
}

function pauseClock(countdown) {
    clearInterval(countdown);
    return Date.now();
}

function restartClock(pauseTime) {
    let newFinishTime = Math.round((Date.now() - pauseTime + finishTime) - Date.now()) / 1000;
    timer(newFinishTime);
}

function workClock() {
    if (!reset) {
        alert("Time to work bro!");
    }
    reset = false;
    resting = false;
    pauseClock(countdown);
    let pomodoro = document.getElementById("pomodoro").textContent;
    timer(pomodoro * 60);
}

function restClock() {
    increaseCounter();
    let ifCompleted = ifFinished();
    if (!ifCompleted) {
        if (!reset) {
            alert("Time to rest bro!");
        }
        reset = false;
        resting = true;
        pauseClock(countdown);
        let restValue = document.getElementById("restValue").textContent;
        timer(restValue * 60);
    } else {
        alert("You done bro - go chill!");
    }
}

function increaseCounter () {
    document.getElementById('counter-number').textContent++;
}

function ifFinished () {
    if (document.getElementById('counter-number').textContent === document.getElementById('goal-text').textContent) {
        return true;
    } else {
        return false;
    }
}

let paused = false;
let startTimer = false;
let resting = false;
let pauseTime;
let finishTime;
let countdown;
let reset = false;

document.getElementById("start-button").addEventListener('click', ()=>{
    if (!startTimer) {
        startTimer = true;
        if (!paused) {
            let pomodoro = document.getElementById("pomodoro").textContent;
            timer(pomodoro * 60);
            startTimer = true;
        }
    }
    else if (startTimer && paused) {
        restartClock(pauseTime);
        paused = false;
    }
});

document.getElementById("pause-button").addEventListener('click', ()=> {
    if (!paused) {
        console.log("paused is false")
        pauseClock(countdown);
        pauseTime = pauseClock();
        paused = true;
    }
});

document.getElementById("reset-button").addEventListener('click', ()=> {
    reset = true;
    paused = false;
    if (!resting) {
        console.log("start the work clock");
        workClock(pomodoro * 60)
    } else {
        console.log("start the rest clock");
        restClock(restValue * 60)
    }
});

document.getElementById('goal-text').textContent = document.getElementById("goal-input").value;

document.getElementById('increase-session').addEventListener("click", ()=>{
    if (!startTimer) {
        document.getElementById("pomodoro").textContent++;
        document.getElementById("minutes-number").textContent = document.getElementById("pomodoro").textContent;
    }
});

document.getElementById('decrease-session').addEventListener("click", ()=> {
    if (!startTimer && document.getElementById("minutes-number").textContent > 0) {
    document.getElementById("pomodoro").textContent--;
    document.getElementById("minutes-number").textContent = document.getElementById("pomodoro").textContent;
    }
});

document.getElementById('increase-rest').addEventListener("click", ()=> {
    if (!startTimer) {
        document.getElementById("restValue").textContent++;
    }
});

document.getElementById('decrease-rest').addEventListener("click", ()=> {
    if (!startTimer && document.getElementById("restValue").textContent > 0) {
        document.getElementById("restValue").textContent--;
    }
});

document.getElementById('goal-button').addEventListener("click", ()=> {
    document.getElementById('goal-text').textContent = document.getElementById('goal-input').value;
});

document.getElementById('reset-counter').addEventListener('click', ()=> {
    document.getElementById('counter-number').textContent = 0;
});
