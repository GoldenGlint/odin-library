//Library Class below

class Library{
    #books=[];
    #numBooks=0;

    get numBooks(){
        return this.#numBooks;
    }
    get books(){
        return this.#books;
    }
    
    increaseBooks(){
        this.#numBooks++
    }

    addBookToLibrary(book){
        this.increaseBooks();
        this.#books.push(book);
        this.addBook(book);
    }

    addBook(book){
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
        
        if(book.read){
            readButton.classList.add("read");
            readButton.textContent="Read";
        }
        else{
            readButton.classList.add("unread");
            readButton.textContent="Unread";
        }

        readButton.addEventListener("click", () => {
            book.toggleRead();                    
            updateReadButton(book, bookCard);     
        })

        readButton.addEventListener("click", ()=>{
            readToggle(book.id, bookCard);
        })

        button.textContent = "Remove";
        button.classList.add("remove-btn");
        button.addEventListener("click", ()=>{
            library.removeBook(book.id, bookCard);
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

    removeBook(id, cardElement) {
        this.#books = this.#books.filter(book => book.id !== id);
        cardElement.remove();
    }

    readToggle(id, cardElement){
        for(let i=0; i<this.#numBooks; i++){
            if(this.#books[i].id==id){
                if(this.#books[i].read==true){
                    this.#books[i].read=false;
                    const card=cardElement.querySelector(".read");
                    card.classList.remove("read");
                    card.classList.add("unread");
                    card.textContent="Unread";
                }
                else{
                    this.#books[i].read=true;
                    const card=cardElement.querySelector(".unread");
                    card.classList.remove("unread");
                    card.classList.add("read");
                    card.textContent="Read";
                }
            }
        }
    }
}

//Book class

class Book{
    #id;
    #title;
    #author;
    #pages;
    #read;
    constructor(title, author, pages, read){
        this.id=crypto.randomUUID();
        this.title=title;
        this.author=author;
        this.pages=pages
        this.read=read
    }

    get id(){
        return this.#id;
    }
    set id(id){
        this.#id=id;
    }
    get title(){
        return this.#title;
    }
    set title(title){
        this.#title=title;
    }
    get author(){
        return this.#author;
    }
    set author(author){
        this.#author=author;
    }
    get pages(){
        return this.#pages;
    }
    set pages(pages){
        this.#pages=pages;
    }
    get read(){
        return this.#read;
    }
    set read(read){
        this.#read=read;
    }

    toggleRead(){
        this.#read=!this.#read;
    }




}



//scripts

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
    const read=formData.get("read") === "on"; 
    const newBook= new Book(title, author, pages, read);
    library.addBookToLibrary(newBook);

    const myDialog=document.querySelector("#dialog")
    dialog.close();
    form.reset();


})

function updateReadButton(book, cardElement) {
    const readButton = cardElement.querySelector(".read-badge");
    
    if (book.read) {
        readButton.classList.remove("unread");
        readButton.classList.add("read");
        readButton.textContent = "Read";
    } else {
        readButton.classList.remove("read");
        readButton.classList.add("unread");
        readButton.textContent = "Unread";
    }
}



const titleField=document.getElementById("title");

titleField.addEventListener("input", (event) => {
    if(titleField.validity.valueMissing){
        titleField.setCustomValidity("Please add a title.")
    }
    else{
        titleField.setCustomValidity("")
    }
})

const authorField=document.getElementById("author");

authorField.addEventListener("input", (event) => {
    if(authorField.validity.valueMissing){
        authorField.setCustomValidity("Please add an author.")
    }
    else{
        authorField.setCustomValidity("")
    }
})

const pagesField=document.getElementById("pages");

pagesField.addEventListener("input", (event) => {
    if(pagesField.validity.valueMissing){
        pagesField.setCustomValidity("Please add a page number.")
    }
    else{
        pagesField.setCustomValidity("")
    }
})

titleField.setCustomValidity("Please add a title.");
authorField.setCustomValidity("Please add an author.");
pagesField.setCustomValidity("Please add a page number.");


const library=new Library();