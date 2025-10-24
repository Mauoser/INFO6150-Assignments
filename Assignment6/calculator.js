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
});
