

const button = document.querySelector('.noteSubmit');
const noteInput = document.querySelector('.noteInput');
const noteList = document.querySelector('.noteList');



button.addEventListener('click', (e) => {

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
    editButton.addEventListener("click", function (event) {
        console.log('hello')
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
})





/* function editItem(event) {
    let item = event.target.innerHTML;
    let itemInput = document.createElement('input');
    itemInput.type = 'text';
    itemInput.value = item;
    itemInput.addEventListener('keypress', saveItem);
    itemInput.addEventListener('click', saveItem);
    event.target.parentNode.prepend(itemInput);
    event.target.remove();
    itemInput.select();
}

function saveItem(event) {
    let inputValue = event.target.value;
    if (event.target.value.length > 0 && (event.keyCode === 13 || event.type === 'click')) {
        let liElement = document.createElement('li');

        liElement.textContent = event.target.value;
        event.target.parentNode.prepend(liElement);
        event.target.remove();
    }
} */