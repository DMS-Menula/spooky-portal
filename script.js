const enterBtn = document.getElementById("enterBtn");
const replayBtn = document.getElementById("replayBtn");
const portalContent = document.getElementById("portalContent");
const bgMusic = document.getElementById("bgMusic");
const whisper = document.getElementById("whisper");
const leftDoor = document.querySelector(".door-left");
const rightDoor = document.querySelector(".door-right");
const lightning = document.getElementById("lightning");
const cursorGlow = document.querySelector(".cursor-glow");
const canvas = document.getElementById("soulsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let souls = Array.from({ length: 40 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 3 + 1,
  alpha: Math.random(),
  speed: Math.random() * 0.5 + 0.2
}));

function animateSouls() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  souls.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 120, 0, ${s.alpha})`;
    ctx.fill();
    s.y -= s.speed;
    s.alpha -= 0.003;
    if (s.alpha <= 0) {
      s.x = Math.random() * canvas.width;
      s.y = canvas.height;
      s.alpha = Math.random();
    }
  });
  requestAnimationFrame(animateSouls);
}

enterBtn.addEventListener("click", () => {
  leftDoor.style.transform = "translateX(-100%) rotateY(-45deg)";
  rightDoor.style.transform = "translateX(100%) rotateY(45deg)";
  whisper.play();
  setTimeout(() => {
    document.querySelector(".portal-door").style.display = "none";
    portalContent.style.display = "block";
    bgMusic.volume = 0.4;
    bgMusic.play();
    animateSouls();
    flashLightning();
    animateSpellText();
  }, 1300);
});

replayBtn.addEventListener("click", () => {
  portalContent.style.display = "none";
  document.querySelector(".portal-door").style.display = "block";
  leftDoor.style.transform = "translateX(0)";
  rightDoor.style.transform = "translateX(0)";
  bgMusic.pause();
  bgMusic.currentTime = 0;
});

function flashLightning() {
  setInterval(() => {
    lightning.style.opacity = "1";
    setTimeout(() => lightning.style.opacity = "0", 100);
  }, 7000 + Math.random() * 3000);
}

const spellText = document.getElementById("spellText");
const text = spellText.textContent;
spellText.textContent = "";
function animateSpellText() {
  let i = 0;
  const interval = setInterval(() => {
    spellText.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 100);
}

document.addEventListener("mousemove", e => {
  cursorGlow.style.left = e.pageX - 30 + "px";
  cursorGlow.style.top = e.pageY - 30 + "px";
});


const batsContainer = document.getElementById("batsContainer");

const batCount = Math.floor(Math.random() * 3) + 6; 
for (let i = 0; i < batCount; i++) {
  const bat = document.createElement("img");
  bat.src = "assets/bats.svg";
  bat.classList.add("bats");

  bat.style.top = `${Math.random() * 80 + 5}%`;
  bat.style.left = `${Math.random() * 80 + 5}%`;

  const size = Math.random() * 50 + 40;
  bat.style.width = `${size}px`;

  const duration = Math.random() * 8 + 8;
  const delay = Math.random() * 5;
  bat.style.animationDuration = `${duration}s`;
  bat.style.animationDelay = `${delay}s`;

  if (Math.random() > 0.5) {
    bat.style.transform = "scaleX(-1)";
  }

  batsContainer.appendChild(bat);
}
