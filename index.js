const addNotesBtn = document.getElementById('addBtn');


const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    // console.log(textAreaData);

    const notes = [];
    textAreaData.forEach((note) => {
        return notes.push(note.value)
    })
    // console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNotes = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note','scroll');

    const htmlData = `
    <div class="operation">
        <button class="edit"> <i class="fa-solid fa-pen-to-square"></i> </button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>
    <div class="mainc ${text ? "":"hidden"}"></div>
    <textarea class="scroll ${text ? "hidden":""}"></textarea>
    `;
    // console.log(note);
    note.insertAdjacentHTML('afterbegin', htmlData);
    document.body.appendChild(note);


    // getting the references
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.mainc');
    const textarea = note.querySelector('textarea');


    // deleting note
    deleteButton.addEventListener('click', () => {
        note.remove();
    
    })

    // toggle edit note
    textarea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })


    // problem with input
    // textarea.addEventListener('input', (event) => {
    //     const value = event.target.value;
    //     console.log(value)
    // })
    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        // console.log(value)
        mainDiv.innerHTML = value;
        updateLSData();
    })

    
};
// getting back localstorage data
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach((note) => {
        addNotes(note);
    });
}

addNotesBtn.addEventListener('click', () => addNotes() )