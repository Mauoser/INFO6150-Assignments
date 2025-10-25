let elapsed = 0;
let timer = null;

function formatTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

document.getElementById("start-btn").addEventListener("click", () => {
  timer = setInterval(() => {
    elapsed++;
    document.getElementById("timer").textContent = formatTime(elapsed);
  }, 1000);
});
