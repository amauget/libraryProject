let output = document.querySelector('.outputText')
const subButton = document.querySelector('.addBtn');
const inputs = document.querySelectorAll('input');
let tracking = [] /* array to distinguish whether a book has been added. */


subButton.addEventListener('click', (event) =>{
    event.preventDefault();
    bookCreater();
    inputs.forEach(input =>{input.value = ''});
    // iterates over all input elements.
    
    
});


function bookCreater(){
     /* Used to target "tracking" array items */

    
        // HTML vars nested to access:
    let title = (document.querySelector('.titleInpt')).value;
    let author = (document.querySelector('.authorInpt')).value;
    let pages = (document.querySelector('.pagesInpt')).value;
    let readStatus = (document.querySelector('.readStatus')).value;

    function Book(title, author, pages, readStatus){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
        
    }
        
    Book.prototype.getBookInfo = function(){
        let readButton = document.createElement('button');
        readButton.textContent= this.readStatus;
        let book = `Title: ${this.title} Author: ${this.author} Pages: ${this.pages}`;
        return book;
    }


    let bookItem = new Book(title, author, pages, readStatus);
    let titleItem = bookItem.title;
    let authorItem = `By: ${bookItem.author}`;
    let pagesItem = `${bookItem.pages} pages`;
    let readItem = bookItem.readStatus;
    if(!tracking.includes(bookItem.title)){ /* does not include */
        tracking.push(bookItem.title);
        bookOutput(titleItem, authorItem, pagesItem, readItem);
        
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
        // let color = 'green';
        // readBtn.style.background = color;

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
        exit.addEventListener('click',() =>{
            form.style.display = 'none';
        })

    }
    
    hiddenFormFunctions();

