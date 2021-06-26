const edit = document.querySelector(".profile__head");
const modal = document.querySelector(".bg-modal");

edit.addEventListener("click", function(event) {
    document.querySelector(".bg-modal").style.display = "flex";
});

document.querySelector(".close").addEventListener("click",
function (event) {
    console.log("hi")
    document.querySelector(".bg-modal").style.display = "none";
});