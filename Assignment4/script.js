let radios = document.querySelectorAll('input[type="radio"]');
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let emailId = document.getElementById("emailId");
let phoneNumber = document.getElementById("phoneNumber");
let zipcode = document.getElementById("zipcode");
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let form = document.getElementById("feedbackForm");
let comments = document.getElementById("comments");

const regExName = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const regExEmail = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
const regExPhone = /\d{3}-?\d{3}-\d{4}$/;

firstName.addEventListener("input", validate);
lastName.addEventListener("input", validate);
emailId.addEventListener("input", validate);
phoneNumber.addEventListener("input", validate);
form.addEventListener("submit", validateForm);

let isFirstNameValid = false;
let isLastNameValid = false;
let isEmailValid = false;
let isPhoneValid = false;
let isZipcode = false;
let isCommentsValid = false;

function validateForm(event) {
  event.preventDefault();
  if (isEmailValid && isNameValid && isPhoneValid) {
    firstName.value = "";
    lastName.value = "";
    emailId.value = "";
    phoneNumber.value = "";
    zipcode.value = "";
    comments.value = "";
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    alert("Form submitted successfully!");
  } else {
    alert("Please fill out the form correctly before submitting.");
  }
}

function validate(event) {
  const value = event.target.value;
  const fieldId = event.target.id;
  const errorField = `error-${fieldId}`;
  const error = document.getElementById(errorField);

  if (fieldId === "firstName") {
    isNameValid = value.trim().match(regExName);
    error.style.display = isNameValid ? "none" : "block";
  } else if (fieldId === "lastName") {
    isEmailValid = value.trim().match(regExName);
    error.style.display = isEmailValid ? "none" : "block";
  } else if (fieldId === "emailId") {
    isEmailValid = value.trim().match(regExEmail);
    error.style.display = isEmailValid ? "none" : "block";
  } else if (fieldId === "phoneNumber") {
    isPhoneValid = value.trim().match(regExPhone);
    error.style.display = isPhoneValid ? "none" : "block";
  }
}
