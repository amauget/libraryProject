let output = document.querySelector('.outputText')
const subButton = document.querySelector('.addItem');
let tracking = [] /* array to distinguish whether a book has been added. */

subButton.addEventListener('click', buttonClick, true);
function buttonClick(event){
        // HTML vars nested to access:
    let title = (document.querySelector('.title')).value;
    let author = (document.querySelector('.author')).value;
    let pages = (document.querySelector('.pages')).value;
    let readStatus = (document.querySelector('.readStatus')).value;

    if(title === null){
        return null; /* Not catching non entries as it should. */
    }
    else{
        function Book(title, author, pages, readStatus){
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.readStatus = readStatus;
        }
        
        Book.prototype.getBookInfo = function(){
            let book = `Title: ${this.title} Author: ${this.author} Pages: ${this.pages} Read Status: ${this.readStatus}`;
            return book;
        }
    
        let bookItem = new Book(title, author, pages, readStatus);
        
        if(bookItem.title !== tracking[tracking.length-1]){
            console.log(bookItem.title + '  ' + tracking[tracking.length-1])
            tracking.push(bookItem.title);
            console.log(tracking);
            let li = document.createElement('li'); /* placement necessary to create new li items */
            li.textContent = bookItem.getBookInfo();
            output.appendChild(li);
        }
        else{
            alert("Title is already in the library!")
        }
    }
    
        event.preventDefault();
}

const delButton = document.querySelector('.delete');

delButton.addEventListener('click', (event) => {
    output.removeChild(-1)

    event.preventDefault(); /* THIS IS STILL CRASHING */
})

