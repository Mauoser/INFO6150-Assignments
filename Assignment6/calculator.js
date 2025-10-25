$(document).ready(() => {
  const rawSession =
    sessionStorage.getItem("calcAppSession") ||
    localStorage.getItem("calcAppSession");
  if (!rawSession) {
    window.location.href = "login.html";
    return;
  }

  let session;
  try {
    session = JSON.parse(rawSession);
  } catch (e) {
    window.location.href = "login.html";
    return;
  }

  if (!session || !session.isLoggedIn) {
    window.location.href = "login.html";
    return;
  }

  $("#welcomeMessage").text(`Welcome, ${session.username}!`);

  const $num1 = $("#num1");
  const $num2 = $("#num2");
  const $num1Error = $("#num1Error");
  const $num2Error = $("#num2Error");
  const $calcError = $("#calcError");
  const $result = $("#result");
  const $ops = $(".op");
  const $logoutBtn = $("#logoutBtn");

  const numberRe = /^-?\d+(\.\d+)?$/;

  function validateNumberField($el, $errEl) {
    const value = $el.val().trim();
    if (!value || !numberRe.test(value)) {
      $errEl.text("Please enter a valid number");
      return false;
    }
    $errEl.text("");
    return true;
  }

  $num1.on("focus", function () {
    $num1Error.text("");
    $calcError.text("");
  });
  $num2.on("focus", function () {
    $num2Error.text("");
    $calcError.text("");
  });

  const calculate = (num1, num2, operation) => {
    const a = Number(num1);
    const b = Number(num2);

    switch (operation) {
      case "add":
        return a + b;
      case "subtract":
        return a - b;
      case "multiply":
        return a * b;
      case "divide":
        if (b === 0) return null;
        return a / b;
    }
  };

  $ops.on("click", function () {
    $calcError.text("");

    const operation = $(this).data("op");
    const ok1 = validateNumberField($num1, $num1Error);
    const ok2 = validateNumberField($num2, $num2Error);
    if (!ok1 || !ok2) {
      $result.val("");
      return;
    }

    const val1 = $num1.val().trim();
    const val2 = $num2.val().trim();
    const res = calculate(val1, val2, operation);

    if (res === null) {
      $calcError.text("Cannot divide by zero");
      $result.val("");
      return;
    }

    $result.val(res).hide().fadeIn(150);
  });

  $logoutBtn.on("click", function () {
    sessionStorage.removeItem("calcAppSession");
    localStorage.removeItem("calcAppSession");

    $("main").fadeOut(400, function () {
      window.location.href = "login.html";
    });
  });
});
