let minutes = 0;
let seconds = 0;

const minDisplay = document.getElementById("minutes");
const secDisplay = document.getElementById("seconds");

const updateDisplay = () => {
  minDisplay.textContent = minutes;
  secDisplay.textContent = seconds.toString().padStart(2, "0");
};

document.querySelectorAll(".inc").forEach(btn => {
  btn.onclick = () => {
    if (btn.dataset.type === "min") minutes++;
    else seconds = (seconds + 1) % 60;
    updateDisplay();
  };
});

document.querySelectorAll(".dec").forEach(btn => {
  btn.onclick = () => {
    if (btn.dataset.type === "min" && minutes > 0) minutes--;
    else if (btn.dataset.type === "sec") {
      seconds = (seconds - 1 + 60) % 60;
    }
    updateDisplay();
  };
});

document.getElementById("start").onclick = () => {
  let total = minutes * 60 + seconds;
  let remaining = total;

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "fr-FR";
    speechSynthesis.speak(msg);
  };

  speak("Minuteur démarré");

  const interval = setInterval(() => {
    remaining--;

    const m = Math.floor(remaining / 60);
    const s = remaining % 60;

    minutes = m;
    seconds = s;
    updateDisplay();

    if (remaining % 10 === 0 && remaining > 0) {
      speak(`${m} minutes ${s} secondes`);
    }

    if (remaining <= 0) {
      speak("Temps terminé");
      clearInterval(interval);
    }
  }, 1000);
};
