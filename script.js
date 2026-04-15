let timer;
let totalSeconds = 0;

const alarmSound = new Audio("https://www.soundjay.com/buttons/beep-07.mp3");
const endMusic = new Audio("notification.mp3");

endMusic.loop = true; // keeps playing until stopped

function editTime() {
    document.getElementById("editBox").classList.toggle("hidden");
}

function setTimer() {
    let h = parseInt(document.getElementById("hours").value) || 0;
    let m = parseInt(document.getElementById("minutes").value) || 0;
    let s = parseInt(document.getElementById("seconds").value) || 0;

    totalSeconds = h * 3600 + m * 60 + s;

    // ✅ Close edit after setting
    document.getElementById("editBox").classList.add("hidden");

    updateDisplay();
    startTimer();
}

function startTimer() {
    clearInterval(timer);

    timer = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timer);

            alarmSound.play().catch(() => { });

            // 🎵 Start music
            endMusic.currentTime = 0;
            endMusic.play().catch(() => { });

            // 👇 Show stop button
            document.getElementById("stopMusicBtn").classList.remove("hidden");

        } else {
            totalSeconds--;
            updateDisplay();
        }
    }, 1000);
}
function pauseTimer() {
    clearInterval(timer);
}
function resetTimer() {
    clearInterval(timer);
    totalSeconds = 0;
    updateDisplay();

    stopMusic(); // stop if playing
}

function updateDisplay() {
    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;

    document.getElementById("display").innerText =
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function stopMusic() {
    endMusic.pause();
    endMusic.currentTime = 0;

    document.getElementById("stopMusicBtn").classList.add("hidden");
}