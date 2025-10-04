let radio = document.querySelectorAll('input[type="radio"]');
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let emailId = document.getElementById("emailId");
let phoneNumber = document.getElementById("phoneNumber");
let zipcode = document.getElementById("zipcode");
let checkbox = document.querySelectorAll('input[type="checkbox"]');
let form = document.getElementById("feedbackForm");
let comments = document.getElementById("comments");

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
    alert("Form submitted successfully!");
  } else {
    alert("Please fill out the form correctly before submitting.");
  }
}
