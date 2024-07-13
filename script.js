let startTime, updatedTime, difference;
let interval;
let paused = true;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', () => {
    if (paused) {
        paused = false;
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 10); // Update every 10ms for better accuracy
    }
});

pauseButton.addEventListener('click', () => {
    if (!paused) {
        paused = true;
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
    }
});

resetButton.addEventListener('click', () => {
    paused = true;
    clearInterval(interval);
    startTime = null;
    updatedTime = null;
    difference = null;
    laps = [];
    display.innerHTML = '00:00:00.00';
    lapsContainer.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (!paused) {
        laps.push(display.innerHTML);
        renderLaps();
    }
});

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const time = new Date(difference);
    const hours = ('0' + time.getUTCHours()).slice(-2);
    const minutes = ('0' + time.getUTCMinutes()).slice(-2); 
    const seconds = ('0' + time.getUTCSeconds()).slice(-2);
    const milliseconds = ('0' + time.getUTCMilliseconds()).slice(-3, -1);
    display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function renderLaps() {
    lapsContainer.innerHTML = laps.map((lap, index) => `<div>Lap ${index + 1}: ${lap}</div>`).join('');
}
