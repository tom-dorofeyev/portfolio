'use strict'

var gBooks;
function generateBooks(numOfBooks) {
    var books = []
    var names = ['Harry potter', 'Lord of the rings', 'The Hobbit', 'The Bro Code'];
    for (let i = 0; i < numOfBooks; i++) {
        var price = getRandomIntInclusive(10, 100);
        var name = names[getRandomIntInclusive(0, names.length-1)]
        books.push(generateSingleBook(name, price));
    }
    gBooks = books;
}

function generateSingleBook(name, price){
    return new Book(makeId(), name, price);
}

function createNewBook(){
    var newBookName = prompt('enter books name');
    var price = getRandomIntInclusive(10, 100);
    if(newBookName) gBooks.push(generateSingleBook(newBookName, price));
}

function updateBook(id, price){
    var bookToUpdate = getBookById(id);
    bookToUpdate.price = price;
    return bookToUpdate;
}

function getBookById(id){
    return gBooks.find((book)=>{
        return book.id === id
    })
}

function removeBook(id){
    return gBooks.splice(getBookIndex(id), 1);
}

function getBookIndex(id){
    gBooks.findIndex((book)=>{
        return book.id === id;
    })
}

function Book(id, name, price, imgUrl){
    this.id = id,
    this.name = name,
    this.price = price,
    this.imgUrl = imgUrl
}