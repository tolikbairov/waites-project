import { fetchUsers } from "./jsonRequests/fetchJson.js";
import { onError } from "./notifies.js";
const tbody = document.querySelector(".tbody");
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
function createTableRow(user) {
  return `<tr>
            <td>${user.id}</th>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.email}</td>
          </tr>`;
}
window.addEventListener("DOMContentLoaded", () => {
  getUsers();
});
