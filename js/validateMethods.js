export function validateEmail(inputText) {
  const mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let errormsg = "";
  if (!inputText.trim()) {
    errormsg = "please enter a email or username";
  } else if (!inputText.match(mailformat)) {
    errormsg = "please enter a valid email or username";
  }
  return errormsg;
}
export function validatePassword(inputText) {
  const passwordFormat = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
  let errormsg = "";
  if (!inputText.trim()) {
    errormsg = "please enter a password";
  } else if (!inputText.match(passwordFormat)) {
    errormsg = "password should contain 1 number, 1 upper and 1 lowercase";
  }
  return errormsg;
}
export function validateName(inputText) {
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
export function validateLastName(inputText) {
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
