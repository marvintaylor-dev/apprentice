const edit = document.querySelectorAll(".profile__pic");

edit.addEventListener("click", function(event){
    console.log('hi')
    document.querySelector(".bg-modal").getElementsByClassName.display = "flex";
});

document.querySelectorAll(".close").addEventListener("click",
function (event) {
    console.log("hi")
    document.querySelector(".bg-modal").style.display = "none";
});