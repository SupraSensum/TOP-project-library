"use strict"

// VARIABLES & CONSTANTS

const myLibrary = [];

// ELEMENTS

const formSubmitButton = document.getElementById('submit');
const theForm = document.querySelector('form');
const formBookName = document.getElementById('bookName');
const formBookAuthor = document.getElementById('bookAuthor');
const formBookPageCount = document.getElementById('bookPageCount');
const formReadStatus = document.getElementById('readStatus');

// EVENT LISTENERS

formSubmitButton.addEventListener('click', (e) => {
   e.preventDefault();
   console.log(`Form validity returned ${theForm.checkValidity().toString().toUpperCase()}`);
   if (theForm.checkValidity()) {
      addBookToLibrary();
   } else {
      alert("Invalid form data");
   }
});

// CONSTRUCTORS

function Book(name, author, pageCount, status) {
   this.author = author;
   this.name = name;
   this.pageCount = pageCount;
   this.status = status;
}

// FUNCTIONS

function addBookToLibrary() {
   // checkIfDuplicateBook();

   myLibrary.push(new Book(...grabFormData()));
   console.log(myLibrary);
}

function grabFormData() {
   const name = formBookName.value
   const author = formBookAuthor.value
   const pages = formBookPageCount.value
   const status = formReadStatus.textContent
   clearFormData();
   return [name, author, pages, status];
}

function clearFormData() {
   formBookName.value = '';
   formBookAuthor.value = '';
   formBookPageCount.value = '';
   formReadStatus.textContent;
}





