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
        console.log(`The book ${library[i].title} is written by ${library[i].author} with ${library[i].pages} pages. Read is ${library[i].read}`);
    }
}

const book1=new Book("Lebron", "James", 100, true);
const book2= new Book("Steph", "Curry", 100, false);
addBookToLibrary(book1);
addBookToLibrary(book2);
printLibrary(myLibrary);