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
