const output = document.getElementById("output");
const input = document.getElementById("input");

// 🔊 keypress sound
const keySound = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
keySound.volume = 0.2;

let currentRound = 0;
let startTime = 0;
let results = [];
let attempts = 0;
let questionsAnswered = 0;
let glitchMode = false;

// typing effect
function print(text, delay = 15) {
  if (Math.random() < 0.02) {
    output.style.opacity = 0.6;
    setTimeout(() => (output.style.opacity = 1), 50);
  }

  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      output.innerHTML += text[i];
      i++;

      // ✅ smooth terminal scroll
      output.parentElement.scrollTop =
        output.parentElement.scrollHeight;

      if (i >= text.length) {
        clearInterval(interval);
        output.innerHTML += "\n";
        resolve();
      }
    }, delay);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// 🌧 MATRIX RAIN
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&";
const fontSize = 14;
let columns = canvas.width / fontSize;
let drops = [];

function initMatrix() {
  columns = canvas.width / fontSize;
  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height;
  }
}

initMatrix();

function drawMatrix() {
  ctx.fillStyle = glitchMode
    ? "rgba(30, 0, 0, 0.15)"
    : "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = glitchMode ? "#ff0033" : "#00ff9f";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text =
      letters[Math.floor(Math.random() * letters.length)];

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (
      drops[i] * fontSize > canvas.height &&
      Math.random() > 0.975
    ) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initMatrix();
});

// 💀 glitch trigger
/*function triggerGlitch() {
  glitchMode = true;
  document.body.classList.add("glitching");

  document.body.style.boxShadow =
    "inset 0 0 200px rgba(255,0,0,0.4)";
  document.body.style.background =
    "radial-gradient(circle, #220000, #000000)";

  setTimeout(() => {
    glitchMode = false;
    document.body.classList.remove("glitching");
    document.body.style.boxShadow = "";
    document.body.style.background = "";
  }, 800);
}*/

function triggerGlitch() {
  glitchMode = true;
  document.body.classList.add("glitching");

  setTimeout(() => {
    glitchMode = false;
    document.body.classList.remove("glitching");
  }, 800);
}

// START ROUND
async function startRound() {
  startTime = Date.now();
  attempts = 0;

  const round = rounds[currentRound];

  await print("");
  await print("====================================");
  await print(`[ROUND ${round.id}] ${round.name}`);
  await print("====================================");

  await sleep(300);

  for (let line of round.intro) {
    await print(line);
  }

  await print("");
  await print("--------------------------------");

  for (let log of round.logs) {
    await print(log);
  }

  await print("--------------------------------");
  await print("");

  for (let line of round.outro) {
    await print(line);
  }

  await print(">> (type 'exit' to give up)");
}

// input handler
input.addEventListener("keydown", function (e) {
  keySound.currentTime = 0;
  keySound.play();

  if (e.key === "Enter") {
    const value = input.value.trim().toUpperCase();
    input.value = "";
    processCommand(value);
  }
});

async function processCommand(cmd) {
  await print(">> " + cmd);

  if (cmd === "EXIT" || cmd === "GIVEUP") {
    await print("[SYSTEM] Session terminated by user");
    await print("[LOG] Generating partial report...");
    downloadCSV();
    return;
  }

  const correct = rounds[currentRound].answer;

  if (cmd === correct) {
    const timeTaken = Math.floor(
      (Date.now() - startTime) / 1000
    );

    results.push({
      round: currentRound + 1,
      time: timeTaken,
      attempts: attempts + 1,
      answered: questionsAnswered + 1,
    });

    questionsAnswered++;

    await print("[ACCESS GRANTED]");
    await print(`[TIME] ${timeTaken}s`);
    await print(`[ATTEMPTS] ${attempts + 1}`);

    currentRound++;

    if (currentRound < rounds.length) {
      await sleep(700);
      startRound();
    } else {
      await sleep(700);
      await print("");
      await print("[SYSTEM] All layers restored");
      await print("[LOG] Generating final report...");
      downloadCSV();
    }
  } else {
    attempts++;

    await print("[ACCESS DENIED]");
    output.innerHTML +=
      "<span class='glitch'>INVALID RESPONSE</span>\n";

    triggerGlitch(); // 💀 red glitch mode

    if (attempts === 2) {
      await print("[HINT] Re-evaluate the pattern...");
    }

    if (attempts === 4) {
      await print("[WARNING] Time is critical...");
    }

    await print(">> RETRY:");
  }
}

// CSV EXPORT
function downloadCSV() {
  let csv =
    "Round,Time (s),Attempts,Questions Answered\n";

  results.forEach((r) => {
    csv += `${r.round},${r.time},${r.attempts},${r.answered}\n`;
  });

  const blob = new Blob([csv], {
    type: "text/csv",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "neuro_results.csv";
  link.click();

  print("[DONE] Report downloaded.");
}

console.log("CTF System Loaded");

// start
startRound();