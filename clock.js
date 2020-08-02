// 00:00:00 min:sec:ms
function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 10),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60)

    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
    return minutes + ":" + seconds + "." + milliseconds
}

// use set interval only to update text display, but Date to track time
function getTimeElapsed() {
    return Date.now() - startTime
}

function updateClock() {
    ms += 1;
    document.getElementById("timer").innerHTML = msToTime(getTimeElapsed(ms))
}

function startClock() {
    timer = window.setInterval("updateClock()", 1)
}