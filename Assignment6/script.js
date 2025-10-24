const USERS = [
  { email: "zhang.l5@northeastern.edu", password: "password123" },
  { email: "smith.j@northeastern.edu", password: "password123" },
  { email: "jones.a@northeastern.edu", password: "password123" },
];

const $email = $("#email");
const $password = $("#password");
const $loginBtn = $("#loginBtn");
const $emailError = $("#emailError");
const $passwordError = $("#passwordError");
const $loginError = $("#loginError");
const $loginSuccess = $("#loginSuccess");

const emailRegex = /^[^\s@]+@northeastern\.edu$/i;

function validateEmail() {
  const val = $email.val().trim();
  if (!val || !emailRegex.test(val)) {
    $emailError.text("Please enter a valid Northeastern email");
    return false;
  }
  $emailError.text("");
  return true;
}

function validatePassword() {
  const val = $password.val();
  if (!val) {
    $passwordError.text("Password cannot be empty");
    return false;
  }
  if (val.length < 8) {
    $passwordError.text("Password must be at least 8 characters");
    return false;
  }
  $passwordError.text("");
  return true;
}

$email.on("keyup blur", validateEmail);
$password.on("keyup blur", validatePassword);

$email.on("focus", () => {
  $emailError.text("");
  $loginError.text("");
});
$password.on("focus", () => {
  $passwordError.text("");
  $loginError.text("");
});

function updateLoginButton() {
  if (validateEmail() && validatePassword()) {
    $loginBtn.prop("disabled", false);
  } else {
    $loginBtn.prop("disabled", true);
  }
}
$email.on("keyup blur", updateLoginButton);
$password.on("keyup blur", updateLoginButton);

$loginBtn.on("click", () => {
  $loginError.text("");
  $loginSuccess.text("");
  if (!(validateEmail() && validatePassword())) return;

  const emailVal = $email.val().trim();
  const passVal = $password.val();

  const matched = USERS.find(
    (u) =>
      u.email.toLowerCase() === emailVal.toLowerCase() && u.password === passVal
  );
  if (!matched) {
    $loginError.text("Invalid email or password");
    return;
  }

  const sessionObj = {
    username: emailVal.split("@")[0],
    email: matched.email,
    loginTimestamp: new Date().toISOString(),
    isLoggedIn: true,
  };

  if ($("#remember").is(":checked")) {
    localStorage.setItem("calcAppSession", JSON.stringify(sessionObj));
  } else {
    sessionStorage.setItem("calcAppSession", JSON.stringify(sessionObj));
  }

  $loginSuccess
    .text("Login successful! Redirecting...")
    .hide()
    .slideDown(400)
    .delay(1200)
    .fadeOut(400);

  setTimeout(() => {
    window.location.href = "calculator.html";
  }, 2000);
});
