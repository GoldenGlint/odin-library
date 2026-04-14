const myLibrary=[]

function Book(title, author, pages, read){
    this.id=crypto.randomUUID();
    this.title=title
    this.author=author
    this.pages=pages
    this.read=read

}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function printLibrary(library){
    for(let i=0; i<library.length; i++){
        const div = document.createElement("div");
        const title = document.createElement("p");
        const author = document.createElement("p");
        const divider=document.createElement("hr")
        const pages = document.createElement("p");
        const span = document.createElement("span");
        const button = document.createElement("button");
        const bookCard=document.createElement("div");

        bookCard.classList.add("book-card");

        title.classList.add("book-title");
        author.textContent=library[i].author;

        title.textContent=library[i].title;
        author.classList.add("book-author");

        divider.classList.add("book-divider");

        pages.classList.add("book-meta");
        pages.textContent = "Pages: ";
        const pagesSpan = document.createElement("span");
        pagesSpan.textContent = library[i].pages;
        pages.appendChild(pagesSpan);

        span.classList.add("read-badge");
        
        if(library[i].read==True){
            span.classList.add("read");
            span.textContent="Read";
        }
        else{
            span.classList.add("unread");
            span.textContent="Unread";
        }

        button.textContent = "Remove";
        button.classList.add("remove-btn");

        div.appendChild(title);
        div.appendChild(author);

        const books=document.querySelector(".books");
        bookCard.appendChild(div);
        bookCard.appendChild(divider);
        bookCard.appendChild(pages);
        bookCard.appendChild(span);
        bookCard.appendChild(button);
    }
}



const btn=document.querySelector(".add");
btn.onclick=()=>alert("Hello World");

const book1=new Book("Lebron", "James", 100, true);
const book2= new Book("Steph", "Curry", 100, false);
addBookToLibrary(book1);
addBookToLibrary(book2);
printLibrary()
