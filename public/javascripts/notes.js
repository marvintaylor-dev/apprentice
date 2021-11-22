const editButtons = document.querySelectorAll('.edit-button');
const currentNotes = document.querySelectorAll('.noteBody');
const updateButtons = document.querySelectorAll('.update-button');
const assignments = document.querySelector('.assignments-board')





for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', (e) => {
        e.preventDefault();
        updateButtons[i].classList.remove('hide');
        createTextArea(currentNotes, i);
    })
}


function createTextArea(arr, idx) {
    let newInput = document.createElement('textarea');

    const currentMessage = arr[idx].innerHTML
    newInput.value = currentMessage;
    newInput.innerText = newInput.value;
    newInput.name = "note[body]"

    arr[idx].replaceWith(newInput);
}

/* for (let editButton of editButtons) {
    editButton.addEventListener('click', function (e) {
        for (let currentNote of currentNotes) {
            if (currentNote.id === editButton.id) {
                for (let container of noteContainers) {
                    if (container.id === currentNote.id) {
                        for (let updateButton of updateButtons) {

                            updateButton.classList.toggle('hide');
                        }
                        let newInput = document.createElement('textarea')
                        const currentMessage = currentNote.innerHTML
                        newInput.value = currentMessage;
                        currentNote.replaceWith(newInput);
                    }
                }
            }
        }
    })
}
 */



//stored in an array list of objects within the notes section of the user.
//assignments available to show but cannot iterate?
//





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