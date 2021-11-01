const sendBtn = document.querySelector(".send-btn");
const email_field = document.querySelector("#exampleInputEmail1");
const emailInvalidFeedback = document.querySelector(".email_invalid-feedback");
const firstnameField = document.querySelector("#exampleInputFirstName");
const firstnameInvalidFeedback = document.querySelector(
  ".firstname_invalid-feedback"
);
const addFieldModalBtn = document.querySelector(".second-modal");
const lastnameField = document.querySelector("#exampleInputLastName");
const lastnameInvalidFeedback = document.querySelector(
  ".lastname_invalid-feedback"
);
const modal = document.getElementById("sendRequestModal");
const editModal = document.querySelector("#editRequestModal");
const openBtn = document.querySelector(".open-request-btn");
const editModalBtn = document.querySelector(".edit-btn");
const birthDateField = document.querySelector("#birthdate");
const experienceField = document.querySelector("#experience");
const profileImageField = document.querySelector("#formFile");
const addFieldBtn = document.querySelector(".add-field-btn");
const fieldList = document.querySelector(".field-list");
const inputAddField = document.querySelector("#inputAddField");
addFieldBtn.addEventListener("click", () => {
  addFieldBtnHandler();
});
function addFieldBtnHandler() {
  const newField = inputAddField.value;
  if (newField.trim()) {
    const liElement = `<li class="list-group-item">${newField}</li>`;
    fieldList.insertAdjacentHTML("beforeend", liElement);
    resetField(inputAddField);
  }
}
editModalBtn.addEventListener("click", () => {
  document.getElementById("backdrop").style.display = "block";
  document.getElementById("editRequestModal").style.display = "block";
  document.getElementById("editRequestModal").classList.add("show");
});
function validateLastName(inputText) {
  let errormsg = "";
  if (!inputText.trim()) {
    errormsg = "please enter a last name";
  }

  return errormsg;
}
function validateEmail(inputText) {
  const mailformat =
    /^(?=[a-z0-9.]{3,20}$)[a-z0-9]+\.?[a-z0-9]+$|^.*@\w+\.[\w.]+$/i;
  let errormsg = "";
  if (!inputText.trim()) {
    errormsg = "please enter a email or username";
  } else if (!inputText.match(mailformat)) {
    errormsg = "please enter a valid email or username";
  }
  return errormsg;
}
function validateName(inputText) {
  let errormsg = "";
  if (!inputText.trim()) {
    errormsg = "please enter a name";
  }

  return errormsg;
}

function onError(error) {
  PNotify.error({
    text: `Request failed, ${error}`,
    delay: 3000,
    maxTextHeight: null,
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
  const {
    firstname,
    lastname,
    email,
    birthDate,
    profileImage,
    experience,
    description,
  } = user;
  const object = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    birthDate: birthDate,
    profileImage: profileImage,
    experience: experience,
    description: description,
  };

  const settings = {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  };

  const fetchResponse = await fetch("db.json", settings);
  if (!fetchResponse.ok) {
    throw new Error(fetchResponse.status);
  }

  const data = await fetchResponse.json();

  return data;
}
// function fetchUsers() {
//   return fetch("./db.json")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       return data.users;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

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
function checkFieldOnFilled(field) {
  if (field.value.trim()) {
    if (field.classList.contains("is-invalid")) {
      field.classList.remove("is-invalid");
    }
    return true;
  }
  field.classList.add("is-invalid");
  return false;
}
async function onsubmitHandler(e) {
  e.preventDefault();

  let validEmail = checkEmail(email_field.value);
  let validFirstname = checkFirstName(firstnameField.value);
  let validLastname = checkLastName(lastnameField.value);
  let validDate = checkFieldOnFilled(birthDateField);
  let validProfileImg = checkFieldOnFilled(profileImageField);
  let validExperience = checkFieldOnFilled(experienceField);
  if (
    validEmail &&
    validFirstname &&
    validLastname &&
    validDate &&
    validProfileImg &&
    validExperience
  ) {
    const user = {
      firstname: firstnameField.value,
      lastname: lastnameField.value,
      email: email_field.value,
      birthDate: birthDateField.value,
      profileImageField: profileImageField.value,
      experience: experienceField.value,
    };

    try {
      await postUsers(user);

      onSuccess();
      closeSendModal();
    } catch (error) {
      onError(error);
    }
  }
}
function resetField(field) {
  field.value = "";
  if (field.classList.contains("is-invalid")) {
    field.classList.remove("is-invalid");
  }
}
function openModal() {
  document.getElementById("backdrop").style.display = "block";
  document.getElementById("sendRequestModal").style.display = "block";
  document.getElementById("sendRequestModal").classList.add("show");
}

function closeSendModal() {
  document.getElementById("backdrop").style.display = "none";
  document.getElementById("sendRequestModal").style.display = "none";
  document.getElementById("sendRequestModal").classList.remove("show");
  resetField(email_field);
  resetField(firstnameField);
  resetField(lastnameField);
  resetField(birthDateField);
  resetField(profileImageField);
  resetField(experienceField);
}
function closeEditModal() {
  document.getElementById("backdrop").style.display = "none";
  document.getElementById("editRequestModal").style.display = "none";
  document.getElementById("editRequestModal").classList.remove("show");
}

openBtn.addEventListener("click", openModal);
document.addEventListener(
  "click",
  function (event) {
    // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
    if (
      event.target.matches("[data-close='send-modal']") ||
      event.target == modal
    ) {
      closeSendModal();
    } else if (
      event.target.matches("[data-close='edit-modal']") ||
      event.target == editModal
    ) {
      closeEditModal();
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
