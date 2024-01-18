let startTime;
let running = false;
let timer;
let lapTimes = [];

function updateDisplay() {
  let elapsedTime = performance.now() - startTime;
  let centiseconds = Math.floor((elapsedTime % 1000) / 10);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));

  document.getElementById("timeDisplay").innerText = formatTime(
    hours,
    minutes,
    seconds,
    centiseconds
  );
}

function formatTime(hours, minutes, seconds, centiseconds) {
  return (
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds +
    "." +
    (centiseconds < 10 ? "0" : "") +
    centiseconds
  );
}

function startStopwatch() {
  if (!running) {
    if (!startTime) {
      startTime = performance.now();
    }
    running = true;
    timer = setInterval(updateDisplay, 10);
  }
}

function stopStopwatch() {
  if (running) {
    clearInterval(timer);
    running = false;
  }
}

function resetStopwatch() {
  stopStopwatch();
  startTime = null;
  document.getElementById("timeDisplay").innerText = "00:00:00.00";
  lapTimes = [];
  updateLapTimes();
}

function lapStopwatch() {
  if (running) {
    let currentTime = performance.now();
    let lapTime = currentTime - startTime;
    lapTimes.push(lapTime);
    startTime = currentTime;
    updateLapTimes();
  }
}

function updateLapTimes() {
  let lapList = document.getElementById("lapList");
  lapList.innerHTML = "";

  for (let i = 0; i < lapTimes.length; i++) {
    let lapTime = lapTimes[i];
    let centiseconds = Math.floor((lapTime % 1000) / 10);
    let seconds = Math.floor((lapTime / 1000) % 60);
    let minutes = Math.floor((lapTime / (1000 * 60)) % 60);
    let hours = Math.floor(lapTime / (1000 * 60 * 60));

    let lapItem = document.createElement("li");
    lapItem.innerText = `Lap ${i + 1}: ${formatTime(
      hours,
      minutes,
      seconds,
      centiseconds
    )}`;
    lapList.appendChild(lapItem);
  }
}
