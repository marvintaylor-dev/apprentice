

const button = document.querySelector('.noteSubmit');
const noteInput = document.querySelector('.noteInput');
const noteList = document.querySelector('.noteList');



button.addEventListener('click', (e) => {
    e.preventDefault()

    const removeButton = document.createElement("button");
    const editButton = document.createElement("button");
    const buttonContainer = document.createElement("div");
    const editInput = document.createElement("input");

    removeButton.innerHTML = "&#10008;"; /* <-- x */
    removeButton.addEventListener("click", function () {
        noteList.removeChild(noteContainer);
    })
    removeButton.classList.add('remove-button');

    editButton.innerHTML = "&#9998;"
    editButton.addEventListener("click", function () {
        noteList.replaceChild(noteContainer);
    })
    editButton.classList.add('edit-button');

    buttonContainer.append(editButton);
    buttonContainer.append(removeButton);
    buttonContainer.classList.add('button-container');

    const noteContainer = document.createElement('li');
    noteContainer.append(noteInput.value);
    noteContainer.append(buttonContainer);


    noteContainer.classList.add('note')
    noteList.append(noteContainer);



    noteInput.value = "";
})
