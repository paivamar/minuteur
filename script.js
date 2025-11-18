document.getElementById("start").onclick = () => {
  let total = parseInt(document.getElementById("duration").value);
  let remaining = total;
  const display = document.getElementById("display");

  // Fonction pour convertir en minute:seconde
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "fr-FR";
    speechSynthesis.speak(msg);
  };

  speak("Minuteur démarré");
  display.textContent = formatTime(remaining);

  const interval = setInterval(() => {
    remaining--;
    display.textContent = formatTime(remaining);

    // Annonce toutes les 10 secondes
    if (remaining % 10 === 0 && remaining > 0) {
      speak(formatTime(remaining));
    }

    if (remaining <= 0) {
      speak("Temps terminé");
      clearInterval(interval);
    }
  }, 1000);
};
