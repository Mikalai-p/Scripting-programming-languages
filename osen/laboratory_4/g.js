const maper = new Map();

function addBook() {
    const idInput = document.getElementById('id');
    const titleInput = document.getElementById('title');
    const colInput = document.getElementById('col');
    const authorInput = document.getElementById('author');
            
    const id = idInput.value.trim();
    const title = titleInput.value.trim();
    const col = parseInt(colInput.value.trim()); 
    const author = authorInput.value.trim();
    
    
            
    maper.set(id, {title, col, author});
            
    
    idInput.value = '';
    titleInput.value = '';
    colInput.value = '';
    authorInput.value = '';
    
    
    updateTotalPages();
}

function updateTotalPages() {
    let total = 0;
    for (let book of maper.values()) {
        total += book.col;
    }
    
    
    document.getElementById('totalPages').textContent = 
        `Общее количество страниц: ${total}`;
}


updateTotalPages();