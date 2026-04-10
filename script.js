
let timeLeft = 25 * 60;
let timerInterval = null;
let isRunning = false;
let audioPlayer = null;

const normalBtn = document.getElementById('btn-normal');
const pomodoroBtn = document.getElementById('btn-pomodoro');
const stopBtn = document.getElementById('btn-stop');
const timerDisplay = document.getElementById('timer-display');

function FormatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
    // Don't start if already running
    if (isRunning) return;

    // Mark as running
    isRunning = true;

    // Start countdown loop - runs every 1000ms (1 second)
    timerInterval = setInterval(() => {
        // Decrease time by 1 second
        timeLeft--;

        // Update display with new time
        timerDisplay.textContent = FormatTime(timeLeft);

        // Stop when reaches 0
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            isRunning = false;
            playSound();  // ADD THIS LINE
        }
    }, 1000);

}

function stopTimer() {
    // Stop the countdown loop
    clearInterval(timerInterval);

    // Mark as not running
    isRunning = false;

    // Reset time back to 25 minutes
    timeLeft = "00" * "00";

    // Update display
    timerDisplay.textContent = FormatTime(timeLeft);
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  stopMusic();  // ADD THIS LINE - stop music when user clicks stop
  timeLeft = 25 * 60;
  timerDisplay.textContent = FormatTime(timeLeft);
}

// Function to play sound
function playSound() {
    audioPlayer = new Audio('notification.mp3');  // Store in variable
    audioPlayer.play();
}

function stopMusic() {
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;  // Reset to beginning
  }
}

// Normal Timer Button - ask user for duration
normalBtn.addEventListener('click', () => {
    const minutes = prompt('How many minutes do you want to study?');
    if (minutes && minutes > 0) {
        timeLeft = minutes * 60;
        timerDisplay.textContent = FormatTime(timeLeft);
        startTimer();
    }
});

// Pomodoro Button - use default 25 minutes
pomodoroBtn.addEventListener('click', () => {
    timeLeft = 25 * 60;  // 25 minutes
    timerDisplay.textContent = FormatTime(timeLeft);
    startTimer();
});

// Stop Button - NEW
stopBtn.addEventListener('click', () => {
    stopTimer();
});

const stopMusicBtn = document.getElementById('btn-stop-music');
stopMusicBtn.addEventListener('click', () => {
  stopMusic();
});
