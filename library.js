let output = document.querySelector('.outputText')
const subButton = document.querySelector('.addBtn');
const inputs = document.querySelectorAll('input');
let tracking = [] /* array to distinguish whether a book has been added. */


subButton.addEventListener('click', (event) =>{
    // HTML vars nested to access:
    let form = document.querySelector('form');
    let title = (document.querySelector('.titleInpt')).value;
    let author = (document.querySelector('.authorInpt')).value;
    let pages = (document.querySelector('.pagesInpt')).value;
    let readStatus = (document.querySelector('.readStatus')).value;

    if(title.length >= 1 && author.length >= 1 && pages.length >= 1){
        bookCreater(title,author,pages,readStatus);
        inputs.forEach(input =>{input.value = ''});
        // iterates over all input elements.
    }
    else{
        form.reportValidity(); /* Prompts HTML "required" fields to display */
    }
    event.preventDefault();
});


function bookCreater(title,author,pages,readStatus){
    function Book(title, author, pages, readStatus){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
        
    Book.prototype.getBookInfo = function(){
        let titleItem = bookItem.title;
        let authorItem = `By: ${bookItem.author}`;
        let pagesItem = `${bookItem.pages} pages`;
        let readItem = bookItem.readStatus;
        bookOutput(titleItem, authorItem, pagesItem, readItem);

    }

    let bookItem = new Book(title, author, pages, readStatus);
    
    
    if(!tracking.includes(bookItem.title)){ /* does not include */
        tracking.push(bookItem.title);
        bookItem.getBookInfo()
    }
    else{
        alert("Title is already in the library!");
    }
}

    function bookOutput(titleItem, authorItem, pagesItem, readItem){  
        let title = document.createElement('div');
        title.className = 'title'
        title.textContent = titleItem;

        let author = document.createElement('div');
        author.className ='author';
        author.textContent = authorItem;

        let pages = document.createElement('div');
        pages.className = 'pages';
        pages.textContent = pagesItem;

        let deleteButton = document.createElement('button'); /* button under conditional to populate all list items. */
        deleteButton.className = 'deleteBtn';
        deleteButton.textContent = 'X';

        let readBtn = document.createElement('button');  
        readBtn.className = 'readBtn'
        readBtn.textContent = readItem;
        changeColor(readBtn);

        let li = document.createElement('li');         /* placement necessary to create new li items */
        li.append(title,author, pages);
        li.appendChild(deleteButton);
        li.appendChild(readBtn);
        output.appendChild(li);

        deleteButton.addEventListener('click',() => {
            tracking = tracking.filter(item => item !== title.textContent);
            // filters tracking to remove item with class name === to delBtn click.
            li.remove();
            return tracking;
        })

        readBtn.addEventListener('click', () =>{
            if(readBtn.textContent === "Read"){
                readBtn.textContent = 'Not Read';
            }
            else{
                readBtn.textContent = 'Read'
            }
            changeColor(readBtn)
        })
}
    function changeColor(readBtn){
        let color = 'rgba(9, 255, 0, 0.288)';
        if(readBtn.textContent === 'Not Read'){
            color = 'rgba(255, 0, 0, 0.288)'
        } 
        readBtn.style.background = color;  
    }

    function hiddenFormFunctions(){
        let addItem = document.querySelector('.addItem');
        let form = document.querySelector('.hidingContainer');
        addItem.addEventListener('click',() =>{
            form.style.display = 'block';
        })
        let exit = document.querySelector('.exit');
        exit.addEventListener('click',(event) =>{
            form.style.display = 'none';
            event.preventDefault();
        })
    }
    
    hiddenFormFunctions();

