let isPlaying = false;
const music = document.getElementById("bg-music");
const opening = document.getElementById("opening");
const message = document.getElementById("message");
const messageCard = message.querySelector(".card");
const titleEl = message.querySelector(".title");
const paragraphs = message.querySelectorAll(".message p");

// glitch hilang setelah 5 detik → opening smooth muncul
setTimeout(() => {
  const glitch = document.getElementById("glitch-screen");
  glitch.style.display = "none";

  opening.classList.remove("hidden");
  setTimeout(() => opening.classList.add("show"), 50);
}, 5000);

function splitLetters(el, text) {
  el.textContent = "";
  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.opacity = 0;
    span.style.display = "inline-block";
    span.style.animation = `fadeLetter 0.5s forwards`;
    span.style.animationDelay = `${i * 0.1}s`;
    el.appendChild(span);
  });
}
function animateParagraphs() {
  paragraphs.forEach((p, i) => {
    setTimeout(() => {
      p.classList.add("show");
    }, i * 1500);
  });
}
function showMessage() {
  opening.classList.add("hidden");
  message.classList.remove("hidden");

  if (!isPlaying) {
    music.play().then(() => { isPlaying = true; })
    .catch(err => console.log("Musik gagal diputar:", err));
  }

  setTimeout(() => {
    messageCard.classList.add("show");
    setTimeout(() => {
      splitLetters(titleEl, "Happy Birthday!");
      const totalDelay = "Happy Birthday!".length * 100 + 1000;
      setTimeout(() => animateParagraphs(), totalDelay);
    }, 2000);
  }, 200);
}
function showOpening() {
  message.classList.add("hidden");
  messageCard.classList.remove("show");
  opening.classList.remove("hidden");
  setTimeout(() => opening.classList.add("show"), 50);

  music.pause(); music.currentTime = 0; isPlaying = false;
  paragraphs.forEach(p => p.classList.remove("show"));
  titleEl.textContent = "";
}
