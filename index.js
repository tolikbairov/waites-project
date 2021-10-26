function openModal() {
  document.getElementById("backdrop").style.display = "block";
  document.getElementById("exampleModal").style.display = "block";
  document.getElementById("exampleModal").classList.add("show");
}
function closeModal() {
  document.getElementById("backdrop").style.display = "none";
  document.getElementById("exampleModal").style.display = "none";
  document.getElementById("exampleModal").classList.remove("show");
}
// Get the modal
const modal = document.getElementById("exampleModal");

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};
