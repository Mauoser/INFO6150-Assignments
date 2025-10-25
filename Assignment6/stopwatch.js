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

  function startTimer() {
    return new Promise((resolve) => {
      clearInterval(timer);
      timer = setInterval(() => {
        elapsed++;
        $("#timer").text(formatTime(elapsed));
      }, 1000);
      resolve();
    });
  }

  function validateFields() {
    let valid = true;
    const dateVal = $("#event-date").val();
    const nameVal = $("#event-name").val().trim();

    $("#date-error").text("");
    $("#name-error").text("");

    if (!dateVal) {
      $("#date-error").text("Please select a date");
      valid = false;
    }

    if (!nameVal) {
      $("#name-error").text("Event name is required");
      valid = false;
    } else if (nameVal.length < 3) {
      $("#name-error").text("Event name must be at least 3 characters");
      valid = false;
    } else if (nameVal.length > 100) {
      $("#name-error").text("Event name too long (max 100 characters)");
      valid = false;
    } else if (!/^[A-Za-z0-9\s\-\']+$/.test(nameVal)) {
      $("#name-error").text("Event name contains invalid characters");
      valid = false;
    }

    return valid;
  }

  $("#event-date, #event-name").on("focus", function () {
    $(this).next(".error").text("");
  });

  $("#start-btn").click(async function () {
    if (!validateFields()) return;

    $("#event-date, #event-name").prop("disabled", true);
    $(this).prop("disabled", true);
    $("#pause-resume-btn, #stop-save-btn").prop("disabled", false);

    isPaused = false;
    await startTimer();
  });

  $("#pause-resume-btn").click(async function () {
    if (isPaused) {
      await startTimer();
      $(this).text("Pause");
      isPaused = false;
    } else {
      clearInterval(timer);
      $(this).text("Resume");
      isPaused = true;
    }
  });

  $("#stop-save-btn").click(function () {
    clearInterval(timer);
    isPaused = false;

    const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    sessions.unshift({
      date: $("#event-date").val(),
      name: $("#event-name").val().trim(),
      duration: formatTime(elapsed),
    });
    localStorage.setItem("sessions", JSON.stringify(sessions));

    elapsed = 0;
    $("#timer").text("00:00:00");
    $("#start-btn").prop("disabled", false);
    $("#pause-resume-btn, #stop-save-btn").prop("disabled", true);
    $("#pause-resume-btn").text("Pause");
    $("#event-date, #event-name").prop("disabled", false);

    renderHistory();
  });

  $("#reset-btn").click(function () {
    clearInterval(timer);
    elapsed = 0;
    $("#timer").text("00:00:00");
    isPaused = false;
    $("#pause-resume-btn, #stop-save-btn").prop("disabled", true);
    $("#pause-resume-btn").text("Pause");
    $("#start-btn").prop("disabled", false);
    $("#event-date, #event-name").prop("disabled", false);
  });

  function renderHistory(filter = "") {
    const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    const filtered = filter
      ? sessions.filter((s) => s.date === filter)
      : sessions;

    const $historyList = $("#history-list");
    $historyList.empty();

    if (filtered.length === 0) {
      $historyList.html("<p>No sessions recorded yet</p>");
    } else {
      filtered.forEach((s) => {
        $historyList.append(
          `<div class="history-item"><strong>${s.date}</strong> - ${s.name} - ${s.duration}</div>`
        );
      });
    }

    $("#total-sessions").text(filtered.length);
    const totalSeconds = filtered.reduce((acc, s) => {
      const [h, m, s_] = s.duration.split(":").map(Number);
      return acc + h * 3600 + m * 60 + s_;
    }, 0);
    $("#total-time").text(formatTime(totalSeconds));
  }

  $("#filter-date").on("change", function () {
    renderHistory($(this).val());
  });

  renderHistory();
});
