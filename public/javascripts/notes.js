

const button = document.querySelector('.noteSubmit');
const noteInput = document.querySelector('.noteInput');
const noteList = document.querySelector('.noteList');


button.addEventListener('click', (e) => {
    e.preventDefault()

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "&#10008;"; /* <-- x */
    removeButton.addEventListener("click", function () {
        noteList.removeChild(noteContainer);
    })
    removeButton.classList.add('remove-button');

    const noteContainer = document.createElement('li');
    noteContainer.append(noteInput.value);
    noteContainer.append(removeButton);

    noteContainer.classList.add('note')
    noteList.append(noteContainer);

    noteInput.value = "";
})
