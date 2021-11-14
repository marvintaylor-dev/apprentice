

const editButton = document.querySelectorAll('.edit-button');



editButton.addEventListener('click', (e) => {
    e.preventDefault()

    console.log(e.target);
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