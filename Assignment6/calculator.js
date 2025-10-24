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
});
