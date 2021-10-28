// import {
//   validateEmail,
//   validateName,
//   validateLastName,
// } from "./validateMethods.js";
function validateLastName(inputText) {
  // const nameFormat = /^[A-Za-z ]+$/;
  let errormsg = "";
  if (!inputText.trim()) {
    errormsg = "please enter a last name";
  }
  // else if (!inputText.match(nameFormat)) {
  //   errormsg = "please enter a valid last name";
  // }
  return errormsg;
}
function validateEmail(inputText) {
  const mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let errormsg = "";
  if (!inputText.trim()) {
    errormsg = "please enter a email or username";
  } else if (!inputText.match(mailformat)) {
    errormsg = "please enter a valid email or username";
  }
  return errormsg;
}
function validateName(inputText) {
  // const nameFormat = /^[A-Za-z ]+$/;
  let errormsg = "";
  if (!inputText.trim()) {
    errormsg = "please enter a name";
  }
  // else if (!inputText.match(nameFormat)) {
  //   errormsg = "please enter a valid name";
  // }
  return errormsg;
}
const tbody = document.querySelector(".tbody");
function createTableRow(user) {
  return `<tr>
            <td>${user.id}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.email}</td>
          </tr>`;
}
window.addEventListener("DOMContentLoaded", () => {
  getUsers();
});
function getUsers() {
  fetchUsers()
    .then((data) => {
      let tableHtml = "";
      data.forEach((element) => {
        tableHtml += createTableRow(element);
      });
      tbody.insertAdjacentHTML("afterbegin", tableHtml);
    })
    .catch((error) => {
      onError(error);
    });
  // postUsers();
}
function onError(error) {
  PNotify.error({
    text: `Request failed, ${error}`,
    delay: 3000,
    stack: new PNotify.Stack({
      dir1: "left",
      dir2: "up", //
      firstpos1: 0,
      firstpos2: 0, //
    }),
  });
}
function onSuccess() {
  PNotify.success({
    text: `Request succeeded`,
    delay: 3000,
    stack: new PNotify.Stack({
      dir1: "left",
      dir2: "up", //
      firstpos1: 0,
      firstpos2: 0, //
    }),
  });
}
async function postUsers(user) {
  const { firstname, lastname, email } = user;
  const object = {
    firstname: firstname,
    lastname: lastname,
    email: email,
  };

  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  };

  const fetchResponse = await fetch(
    "https://my-json-server.typicode.com/tolikbairov/json-server/users",
    settings
  );
  if (!fetchResponse.ok) {
    throw new Error(fetchResponse.status);
  }

  const data = await fetchResponse.json();
  return data;
}
function fetchUsers() {
  return fetch(
    "https://my-json-server.typicode.com/tolikbairov/json-server/users"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}
// import { fetchUsers, postUsers } from "./jsonRequests/fetchJson.js";
// import { onSuccess, onError } from "./notifies.js";
// import "./table.js";
// import { createTableRow, tbody } from "./table.js";
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
      const savedUser = await postUsers(user);

      onSuccess();
      closeModal();
      tbody.insertAdjacentHTML("beforeend", createTableRow(savedUser));
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
