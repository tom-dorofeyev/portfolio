'use strict'

$(document).ready(()=> {
    generateBooks(10);
    renderBooks(gBooks); 
    $('.add-book').click(()=>{
        createNewBook();
        renderBooks(gBooks);
    });
})

function renderBooks(books){
    var strHtml = ''
    for(var i = 0; i < books.length; i++){
        if(books[i].name === 'The Bro Code') books[i].imgUrl = 'img/books/bro-code.jpg';
        else if(books[i].name === 'Harry potter') books[i].imgUrl = 'img/books/harry-potter.jpg';
        else if(books[i].name === 'Lord of the rings') books[i].imgUrl = 'img/books/lord-of-the-rings.jpg';
        else if(books[i].name === 'The Hobbit') books[i].imgUrl = 'img/books/the-hobbit.jpg';
        else books[i].imgUrl = 'img/books/generic-book.jpg';
        strHtml += `<tr><th scope="row">${i + 1}</th>` +
        `<td>${books[i].name}</td><td>${books[i].price}$</td>
        <td><img src="${books[i].imgUrl}" alt="book-img"/></td><td><div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-success read-book-btn" onClick="onReadBook('${books[i].id}')">Read</button>
        <button type="button" class="btn btn-warning updatebook-btn" onClick="readAndUpdateBook('${books[i].id}')" >Update</button>
        <button type="button" class="btn btn-danger delete-book-btn" onClick="onDeleteBook('${books[i].id}')">Delete</button>
      </div></td></tr>`
    }
    $('table tBody').html(strHtml);
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var $modal = $('.modal')
    $modal.find('h5').html(`<img src="${book.imgUrl}" alt="book-img"/>` + book.name)
    $modal.find('.modal-body').html(`<button value="plus" onClick="updateRate(this)" 
    type="button" class="btn btn-success"><i class="fas fa-plus"></i></button>
    Rating: <div class="movie-rate">0</div><button value="minus" onClick="updateRate(this)"  
    type="button" class="btn btn-danger"><i class="fas fa-minus"></i></button>
    <div class="modal-price">Price: ${book.price}$</div>`);
    $modal.show()
}

function updateRate(el){
    if(el.value === 'plus'){
        var rate = +$('.movie-rate').text();
        $('.movie-rate').text(++rate);
    } else {
        var rate = +$('.movie-rate').text();
        $('.movie-rate').text(--rate);
    }
}

function onDeleteBook(bookId){
    removeBook(bookId);
    renderBooks(gBooks);
}

function readAndUpdateBook(bookId){
    var priceToUpdate = prompt('Enter new price for the book');
    if(!priceToUpdate) return;
    updateBook(bookId, priceToUpdate);
    renderBooks(gBooks);
}

function onCloseModal() {
    $('.modal').hide()
}