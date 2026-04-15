let myLibrary=[]

function Book(title, author, pages, read){
    this.id=crypto.randomUUID();
    this.title=title
    this.author=author
    this.pages=pages
    this.read=read

}

function addBookToLibrary(book){
    myLibrary.push(book);
    addBook(book);
}

function addBook(book){
        const div = document.createElement("div");
        const title = document.createElement("p");
        const author = document.createElement("p");
        const divider=document.createElement("hr")
        const pages = document.createElement("p");
        const readButton = document.createElement("button");
        const button = document.createElement("button");
        const bookCard=document.createElement("div");

        bookCard.classList.add("book-card");
        bookCard.dataset.id=book.id;

        title.classList.add("book-title");
        author.textContent=book.author;

        title.textContent=book.title;
        author.classList.add("book-author");

        divider.classList.add("book-divider");

        pages.classList.add("book-meta");
        pages.textContent = "Pages: ";
        const pagesSpan = document.createElement("span");
        pagesSpan.textContent = book.pages;
        pages.appendChild(pagesSpan);

        readButton.classList.add("read-badge");
        
        if(book.read==true){
            readButton.classList.add("read");
            readButton.textContent="Read";
        }
        else{
            readButton.classList.add("unread");
            readButton.textContent="Unread";
        }

        readButton.addEventListener("click", ()=>{
            readToggle(book.id, bookCard);
        })

        button.textContent = "Remove";
        button.classList.add("remove-btn");
        button.addEventListener("click", ()=>{
            removeBook(book.id, bookCard);
        })

        div.appendChild(title);
        div.appendChild(author);

        bookCard.appendChild(div);
        bookCard.appendChild(divider);
        bookCard.appendChild(pages);
        bookCard.appendChild(readButton);
        bookCard.appendChild(button);

        const books=document.querySelector(".books");
        books.appendChild(bookCard);

}
/* Form Controls */

const dialog = document.getElementById("dialog");
const closeButton=document.querySelector("#close-button");
closeButton.addEventListener("click", () => {
    dialog.close();
});

const form=document.querySelector("#book-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formInfo=event.target;

    const formData = new FormData(formInfo);
    const title=formData.get("title");
    const author=formData.get("author");
    const pages=formData.get("pages");
    const read=formData.get("read");
    const newBook= new Book(title, author, pages, read);
    addBook(newBook);

    const myDialog=document.querySelector("#dialog")
    dialog.close();
    form.reset();


})

/* remove button */
function removeBook(id, cardElement) {
  myLibrary = myLibrary.filter(book => book.id !== id);
  cardElement.remove();
}

function readToggle(id, cardElement){
    for(let i=0; i<myLibrary.length; i++){
        if(myLibrary[i].id==id){
            if(myLibrary[i].read==true){
                myLibrary[i].read=false;
                const card=cardElement.querySelector(".read");
                card.classList.remove("read");
                card.classList.add("unread");
                card.textContent="Unread";
            }
            else{
                myLibrary[i].read=true;
                const card=cardElement.querySelector(".unread");
                card.classList.remove("unread");
                card.classList.add("read");
                card.textContent="Read";
            }
        }
    }
}



/*
const btn=document.querySelector(".add");
btn.onclick=()=>alert("Hello World");*/

const book1=new Book("Lebron", "James", 100, true);
const book2= new Book("Steph", "Curry", 100, false);
addBookToLibrary(book1);
addBookToLibrary(book2);

