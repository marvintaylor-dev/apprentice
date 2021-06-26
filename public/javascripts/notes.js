

const button = document.querySelector('.noteSubmit');
const noteInput = document.querySelector('.noteInput');
const noteList = document.querySelector('.noteList');


button.addEventListener('click', (e) => {
    e.preventDefault()
    const noteContainer = document.createElement('li');
    const dash = noteContainer.append('-- ')
    const note = noteContainer.append(noteInput.value)
    noteContainer.classList.add('note')
    noteList.append(noteContainer);
})
