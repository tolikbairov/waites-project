import {
  validateEmail,
  validateName,
  validateLastName,
} from "./validateMethods.js";
import { fetchUsers, postUsers } from "./jsonRequests/fetchJson.js";
import { onSuccess, onError } from "./notifies.js";
import "./table.js";
const sendBtn = document.querySelector(".send-btn");
const email_field = document.querySelector("#exampleInputEmail1");
const emailInvalidFeedback = document.querySelector(".email_invalid-feedback");
const firstnameField = document.querySelector("#exampleInputFirstName");
const firstnameInvalidFeedback = document.querySelector(
  ".firstname_invalid-feedback"
);
const lastnameField = document.querySelector("#exampleInputLastName");
const lastnameInvalidFeedback = document.querySelector(
  ".lastname_invalid-feedback"
);
const modal = document.getElementById("exampleModal");
const openBtn = document.querySelector(".open-modal");

function checkLastName(name) {
  let errormsg = validateLastName(name);
  if (!errormsg) {
    if (lastnameField.classList.contains("is-invalid")) {
      lastnameField.classList.remove("is-invalid");
    }
    return true;
  } else {
    lastnameField.classList.add("is-invalid");
    lastnameInvalidFeedback.textContent = errormsg;
    return false;
  }
}
function checkFirstName(name) {
  let errormsg = validateName(name);
  if (!errormsg) {
    if (firstnameField.classList.contains("is-invalid")) {
      firstnameField.classList.remove("is-invalid");
    }
    return true;
  } else {
    firstnameField.classList.add("is-invalid");
    firstnameInvalidFeedback.textContent = errormsg;
    return false;
  }
}

function checkEmail(email) {
  let errormsg = validateEmail(email);
  if (!errormsg) {
    if (email_field.classList.contains("is-invalid")) {
      email_field.classList.remove("is-invalid");
    }
    return true;
  } else {
    email_field.classList.add("is-invalid");
    emailInvalidFeedback.textContent = errormsg;
    return false;
  }
}

async function onsubmitHandler(e) {
  e.preventDefault();

  let validEmail = checkEmail(email_field.value);
  let validFirstname = checkFirstName(firstnameField.value);
  let validLastname = checkLastName(lastnameField.value);
  if (validEmail && validFirstname && validLastname) {
    const user = {
      firstname: firstnameField.value,
      lastname: lastnameField.value,
      email: email_field.value,
    };

    try {
      await postUsers(user);
      onSuccess();
    } catch (error) {
      onError(error);
    }
  }
}

function openModal() {
  document.getElementById("backdrop").style.display = "block";
  document.getElementById("exampleModal").style.display = "block";
  document.getElementById("exampleModal").classList.add("show");
}
function closeModal() {
  document.getElementById("backdrop").style.display = "none";
  document.getElementById("exampleModal").style.display = "none";
  document.getElementById("exampleModal").classList.remove("show");
  email_field.value = "";
  firstnameField.value = "";
  lastnameField.value = "";
  if (lastnameField.classList.contains("is-invalid")) {
    lastnameField.classList.remove("is-invalid");
  }
  if (firstnameField.classList.contains("is-invalid")) {
    firstnameField.classList.remove("is-invalid");
  }
  if (email_field.classList.contains("is-invalid")) {
    email_field.classList.remove("is-invalid");
  }
}

// sendBtn.addEventListener("click", () => {
//   e.preventDefault();

// });
openBtn.addEventListener("click", openModal);
document.addEventListener(
  "click",
  function (event) {
    // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
    if (event.target.matches(".close-modal-btn") || event.target == modal) {
      closeModal();
    }
  },
  false
);
lastnameField.addEventListener("blur", (e) => {
  checkLastName(e.target.value);
});
firstnameField.addEventListener("blur", (e) => {
  checkFirstName(e.target.value);
});
email_field.addEventListener("blur", (e) => {
  checkEmail(e.target.value);
});
sendBtn.addEventListener("click", (e) => onsubmitHandler(e));
