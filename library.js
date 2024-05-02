hiddenFormFunctions();

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
let output = document.querySelector('.outputText')
let addBtn = document.querySelector('.addBtn');
let inputs = document.querySelectorAll('input');
let tracking = []; /* array to distinguish whether a book has been added. */

addBtn.addEventListener('click', (event) =>{
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
  class Book{
    constructor(title, author, pages, readStatus){
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.readStatus = readStatus;
    }
    bookOutput(){  
      let title = document.createElement('div');
      title.className = 'title'
      title.textContent = this.title;

      let author = document.createElement('div');
      author.className ='author';
      author.textContent = `By: ${this.author}`;

      let pages = document.createElement('div');
      pages.className = 'pages';
      pages.textContent = `${this.pages} pages`;

      let deleteBtn = document.createElement('button'); /* button under conditional to populate all list items. */
      deleteBtn.className = 'deleteBtn';
      deleteBtn.textContent = 'X';

      let readBtn = document.createElement('button');  
      readBtn.className = 'readBtn'
      readBtn.textContent = this.readStatus;
      

      let li = document.createElement('li');         /* placement necessary to create new li items */
      li.append(title,author, pages);
      li.appendChild(deleteBtn);
      li.appendChild(readBtn);
      output.appendChild(li);
      
      buttonEvents(deleteBtn, readBtn, li, this.title)
      changeColor(readBtn);
    }
  }
    let bookItem = new Book(title, author, pages, readStatus);
    
    
    if(!tracking.includes(bookItem.title)){ /* does not include */
      tracking.push(bookItem.title);
      bookItem.bookOutput();
    }
    else{
        alert("Title is already in the library!");
    }
}
function buttonEvents(deleteBtn, readBtn, li, title){
  
  deleteBtn.addEventListener('click',() => {
    tracking = tracking.filter(item => item !== title);
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



