hiddenFormFunctions();

function hiddenFormFunctions(){
  let addItem = document.querySelector('.addItem');
  let hiddenContainer = document.querySelector('.hiddenContainer');
  addItem.addEventListener('click',() =>{
      hiddenContainer.style.display = 'block';
      formValidation();
  })
  let exit = document.querySelector('.exit');
  exit.addEventListener('click',(event) =>{
      hiddenContainer.style.display = 'none';
      event.preventDefault();
  })
}
let output = document.querySelector('.outputText')
let addBtn = document.querySelector('.addBtn');
let inputs = document.querySelectorAll('input');
let tracking = []; /* array to distinguish whether a book has been added. */

function formValidation(){
  let title = (document.querySelector('.titleInpt'));
  let author = (document.querySelector('.authorInpt'));
  let pages = (document.querySelector('.pagesInpt'));
  let readStatus = (document.querySelector('.readStatus'));
  
  addBtn.addEventListener('click', (event) =>{
    let elementArray = [title, author, pages];

    let validCount = 0; /* adds up to 3 as each elementArray item is validated. */
    
    for (let i = 0; i < elementArray.length; i++){
      
      let item = elementArray[i];

      let itemError = document.querySelector(`#${item.id}+ span.error`);

      if(item.validity.valid){
        item.style.border = '1px solid black';
        
        itemError.textContent = ''; 
        itemError.className = 'error' /* switch back to OG format */

        validCount++;

        if(validCount === 3){
          let duplicate = bookCreater(title.value, author.value, pages.value, readStatus.value);
          if(duplicate === false){
            elementArray.forEach(item => {
              formReset(item, itemError);
            }); 
          }
        }
      }
      else{
        showError(item, itemError);
      }
      event.preventDefault();
    }
  })
  let formReset = (item, itemError) =>{
    item.value = '';
    item.style.border = '1px solid black';

    itemError.textContent = ''; 
    itemError.className = 'error' /* switch back to OG format */

  }
  let showError = (item, itemError) => {
    if(item.validity.valueMissing){
      itemError.textContent = item.type + ' is required.'
    }
    else if(item.validity.typeMismatch){
      itemError.textContent = `Entry does not match the required ${item.type} format`;
    }
    else if(item.validity.rangeUnderflow){
      console.log('not enough pages')
      itemError.textContent = `Item must have a minimum page count of ${item.min}.`;
    }

     itemError.className = 'error active'
     item.style.border = '1px solid red'
    }

}


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
      

      let li = document.createElement('li');  
      li.append(title,author, pages, deleteBtn, readBtn);
      output.appendChild(li);
      
      buttonEvents(deleteBtn, readBtn, li, this.title)
      changeColor(readBtn);
    }
  }
    let bookItem = new Book(title, author, pages, readStatus);
    
    console.log(tracking)

    if(tracking.includes(bookItem.title)){ /* does not include */
      alert("Title is already in the library!");
      return true;
      
    }
    else{
      tracking.push(bookItem.title);
      bookItem.bookOutput();
      return false;
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



