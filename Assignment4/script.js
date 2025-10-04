let radios = document.querySelectorAll('input[type="radio"]');
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let emailId = document.getElementById("emailId");
let phoneNumber = document.getElementById("phoneNumber");
let zipcode = document.getElementById("zipcode");
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let comments = document.getElementById("comments");
let form = document.getElementById("feedbackForm");
let submit = document.getElementById("submit");
let streetAddress2 = document.getElementById("streetAddress2");

const regExName = /^[A-Za-z]{2,20}$/;
const regExEmail = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
const regExPhone = /^\(\d{3}\)\s\d{3}-\d{4}$/;
const regZipcode = /^\d{5}$/;
const regComments = /^.{10,200}$/;

firstName.addEventListener("input", validate);
lastName.addEventListener("input", validate);
emailId.addEventListener("input", validate);
phoneNumber.addEventListener("input", validate);
zipcode.addEventListener("input", validate);
comments.addEventListener("input", validate);
form.addEventListener("submit", validateForm);

let isNameValid = false;
let isEmailValid = false;
let isPhoneValid = false;
let isZipcodeValid = false;
let isCommentsValid = false;
let isCheckboxValid = false;
let isTitleValid = false;

function validateForm(event) {
  event.preventDefault();
  if (isEmailValid && isNameValid && isPhoneValid) {
    radios.forEach((radio) => {
      radio.checked = false;
    });
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

  if (fieldId === "firstName" || fieldId === "lastName") {
    isNameValid = value.trim().match(regExName);
    error.style.display = isNameValid ? "none" : "block";
  } else if (fieldId === "emailId") {
    isEmailValid = value.trim().match(regExEmail);
    error.style.display = isEmailValid ? "none" : "block";
  } else if (fieldId === "phoneNumber") {
    isPhoneValid = value.trim().match(regExPhone);
    error.style.display = isPhoneValid ? "none" : "block";
  } else if (fieldId === "zipcode") {
    isZipcodeValid = value.trim().match(regZipcode);
    error.style.display = isZipcodeValid ? "none" : "block";
  } else if (fieldId === "comments") {
    isCommentsValid = value.trim().match(regComments);
    error.style.display = isCommentsValid ? "none" : "block";
  }
  enableSubmit();
}

phoneNumber.addEventListener("input", function () {
  let value = phoneNumber.value.replace(/\D/g, "");
  if (value.length > 10) {
    value = value.substring(0, 10);
  }
  let formattedValue = value;
  if (value.length > 6) {
    formattedValue = `(${value.substring(0, 3)}) ${value.substring(
      3,
      6
    )}-${value.substring(6)}`;
  } else if (value.length > 3) {
    formattedValue = `(${value.substring(0, 3)}) ${value.substring(3)}`;
  } else if (value.length > 0) {
    formattedValue = `(${value}`;
  }
  phoneNumber.value = formattedValue;
});

function validateCheckboxes() {
  const checkedBoxes = document.querySelectorAll(
    'input[name="source"]:checked'
  );
  isCheckboxValid = checkedBoxes.length > 0;
  const errorCheckbox = document.getElementById("error-source");
  errorCheckbox.style.display = isCheckboxValid ? "none" : "block";
  enableSubmit();
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", validateCheckboxes);
});

radios.forEach((radio) => {
  radio.addEventListener("change", function () {
    isTitleValid =
      document.querySelector('input[name="title"]:checked') != null;
    updateSubmitButton();
  });
});

function enableSubmit() {
  if (
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isZipcodeValid &&
    isCheckboxValid &&
    isCommentsValid
  ) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}

streetAddress2.addEventListener("input", function () {
  let streetAddress2Counter = document.getElementById("streetAddress2-counter");
  let currentLength = streetAddress2.value.length;
  let maxLength = streetAddress2.getAttribute("maxlength");
  streetAddress2Counter.innerHTML = `<label>&#8203;</label>${currentLength}/${maxLength} characters used`;
});
