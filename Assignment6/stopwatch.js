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

document.getElementById("pause-btn").addEventListener("click", () => {
  clearInterval(timer);
});

document.getElementById("reset-btn").addEventListener("click", () => {
  clearInterval(timer);
  elapsed = 0;
  document.getElementById("timer").textContent = "00:00:00";
});

document.getElementById("stop-btn").addEventListener("click", () => {
  clearInterval(timer);

  const date = document.getElementById("event-date").value;
  const name = document.getElementById("event-name").value;

  if (!date || !name) {
    alert("Please enter date and event name");
    return;
  }

  const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
  sessions.unshift({ date, name, duration: formatTime(elapsed) });
  localStorage.setItem("sessions", JSON.stringify(sessions));

  elapsed = 0;
  document.getElementById("timer").textContent = "00:00:00";

  renderHistory();
});

function renderHistory() {
  const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
  const historyDiv = document.getElementById("history");
  historyDiv.innerHTML = "<h2>Session History</h2>";

  if (sessions.length === 0) {
    historyDiv.innerHTML += "<p>No sessions recorded yet</p>";
  } else {
    sessions.forEach((s) => {
      historyDiv.innerHTML += `<p>${s.date} - ${s.name} - ${s.duration}</p>`;
    });
  }
}

renderHistory();
