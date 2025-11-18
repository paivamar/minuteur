document.getElementById("start").onclick = () => {
  let total = parseInt(document.getElementById("duration").value);
  let remaining = total;
  const display = document.getElementById("display");

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "fr-FR";
    speechSynthesis.speak(msg);
  };

  speak("Minuteur démarré");

  const interval = setInterval(() => {
    remaining--;
    display.textContent = remaining;

    if (remaining % 10 === 0 && remaining > 0) {
      speak(remaining + " secondes restantes");
    }

    if (remaining <= 0) {
      speak("Temps terminé");
      clearInterval(interval);
    }
  }, 1000);
};
