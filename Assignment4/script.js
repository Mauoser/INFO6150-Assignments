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
let campus = document.getElementById("campus");

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
let isCampusValid = false;
let isCampusFeedbackValid = true;

function validateForm(event) {
  event.preventDefault();

  // Gather form values
  const title =
    document.querySelector('input[name="title"]:checked')?.value || "";
  const first = firstName.value.trim();
  const last = lastName.value.trim();
  const email = emailId.value.trim();
  const phone = phoneNumber.value.trim();
  const zip = zipcode.value.trim();
  const address2 = streetAddress2.value.trim(); // Optional
  const sources = Array.from(
    document.querySelectorAll('input[name="source"]:checked')
  )
    .map((cb) => cb.value)
    .join(", ");
  const selectedCampus = campus.value;
  const campusFeedback = document.getElementById("campusFeedback")?.value || "";
  const comment = comments.value.trim();

  // Show table container
  const tableContainer = document.getElementById("submission-table-container");
  tableContainer.style.display = "block";

  const tbody = document.querySelector("#submission-table tbody");

  // Create new row
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${title}</td>
    <td>${first}</td>
    <td>${last}</td>
    <td>${email}</td>
    <td>${phone}</td>
    <td>${zip}</td>
    <td>${address2}</td>
    <td>${sources}</td>
    <td>${selectedCampus}</td>
    <td>${campusFeedback}</td>
    <td>${comment}</td>
  `;
  tbody.appendChild(row);

  // Reset the form
  form.reset();
  document.getElementById("campus-box").innerHTML = "";
  const addressCounter = document.getElementById("streetAddress2-counter");
  if (addressCounter)
    addressCounter.innerHTML = `<label>&#8203;</label>0/20 characters used`;

  isNameValid = false;
  isEmailValid = false;
  isPhoneValid = false;
  isZipcodeValid = false;
  isCommentsValid = false;
  isCheckboxValid = false;
  isTitleValid = false;
  isCampusValid = false;
  isCampusFeedbackValid = true;
  submit.disabled = true;

  const errors = document.querySelectorAll(".error");
  errors.forEach((err) => (err.style.display = "none"));

  alert("Form submitted successfully!");
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
    isCommentsValid &&
    isTitleValid &&
    isCampusValid &&
    isCampusFeedbackValid
  ) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}

streetAddress2.addEventListener("input", function () {
  const addressCounter = document.getElementById("streetAddress2-counter");
  let currentLength = streetAddress2.value.length;
  addressCounter.innerHTML = `<label>&#8203;</label>${currentLength}/20 characters used`;
});

campus.addEventListener("change", function () {
  const campusBox = document.getElementById("campus-box");
  const selectedCampus = campus.value;
  campusBox.innerHTML = "";

  isCampusValid = selectedCampus !== "";
  enableSubmit();

  if (selectedCampus) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "feedbackCheckbox";
    checkbox.name = "feedbackCheckbox";

    const label = document.createElement("label");
    label.htmlFor = "feedbackCheckbox";
    label.textContent = ` Write feedback for ${selectedCampus}?`;

    const error = document.createElement("div");
    error.id = "error-campusFeedback";
    error.className = "error";
    error.innerHTML = `<label>&#8203;</label>Enter feedback between 10-100 characters`;
    error.style.display = "none";

    campusBox.appendChild(checkbox);
    campusBox.appendChild(label);
    campusBox.appendChild(error);

    checkbox.addEventListener("change", function () {
      const existingField = document.getElementById("campusFeedback");
      const errorMsg = document.getElementById("error-campusFeedback");

      if (existingField) existingField.remove();

      if (checkbox.checked) {
        const textarea = document.createElement("textarea");
        textarea.id = "campusFeedback";
        textarea.name = "campusFeedback";
        textarea.maxLength = 100;
        textarea.placeholder = `Enter feedback for ${selectedCampus}`;
        campusBox.appendChild(textarea);

        if (errorMsg) {
          campusBox.appendChild(errorMsg);
        }

        isCampusFeedbackValid = false;
        errorMsg.style.display = "block";

        textarea.addEventListener("input", function () {
          const len = textarea.value.trim().length;
          if (len >= 10 && len <= 100) {
            errorMsg.style.display = "none";
            isCampusFeedbackValid = true;
          } else {
            errorMsg.style.display = "block";
            isCampusFeedbackValid = false;
          }
          enableSubmit();
        });
      } else {
        isCampusFeedbackValid = true;
        if (errorMsg) errorMsg.style.display = "none";
      }

      enableSubmit();
    });
  }
});

form.addEventListener("reset", function () {
  isNameValid = false;
  isEmailValid = false;
  isPhoneValid = false;
  isZipcodeValid = false;
  isCommentsValid = false;
  isCheckboxValid = false;
  isTitleValid = false;
  isCampusValid = false;
  submit.disabled = true;

  const errors = document.querySelectorAll(".error");
  errors.forEach((err) => (err.style.display = "none"));

  document.getElementById("campus-box").innerHTML = "";

  const addressCounter = document.getElementById("streetAddress2-counter");
  if (addressCounter)
    addressCounter.innerHTML = `<label>&#8203;</label>0/20 characters used`;
});

const aiButton = document.getElementById("ai-button");
const chatWindow = document.getElementById("chat-window");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

const answers = {
  email:
    "You must use your Northeastern email (example: student@northeastern.edu).",
  phone: "The phone number must be in the format (XXX) XXX-XXXX.",
  zip: "The zip code must be exactly 5 digits.",
  required: "All fields are required except Street Address 2.",
  street:
    "No, it is optional. If left blank, it will remain empty in the results table.",
  address:
    "No, it is optional. If left blank, it will remain empty in the results table.",
};

aiButton.addEventListener("click", () => {
  chatWindow.style.display =
    chatWindow.style.display === "none" ? "flex" : "none";
  chatInput.focus();
});

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.textContent = `${sender}: ${text}`;
  msg.style.margin = "5px 0";
  msg.style.wordWrap = "break-word";
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  addMessage("You", userMessage);

  let response = "Sorry, I don’t know that yet. Please check the instructions.";
  const lowerMsg = userMessage.toLowerCase();

  for (let key in answers) {
    if (lowerMsg.includes(key)) {
      response = answers[key];
      break;
    }
  }

  setTimeout(() => {
    addMessage("AI", response);
  }, 500);

  chatInput.value = "";
}

chatSend.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message");

  if (sender === "You") {
    msg.classList.add("user");
  } else {
    msg.classList.add("ai");
  }

  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
