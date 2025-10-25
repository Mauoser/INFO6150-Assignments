$(document).ready(() => {
  let timer = null;
  let elapsed = 0;
  let isPaused = false;

  function formatTime(sec) {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  async function startTimer() {
    return new Promise((resolve) => {
      timer = setInterval(() => {
        elapsed++;
        $("#timer").text(formatTime(elapsed));
      }, 1000);
      resolve();
    });
  }

  $("#start-btn").click(async function () {
    await startTimer();
  });

  $("#reset-btn").click(function () {
    clearInterval(timer);
    elapsed = 0;
    $("#timer").text("00:00:00");
    isPaused = false;
    $("#pause-resume-btn").text("Pause").prop("disabled", true);
    $("#stop-save-btn").prop("disabled", true);
    $("#start-btn").prop("disabled", false);
    $("#event-date, #event-name").prop("disabled", false);
  });
});
