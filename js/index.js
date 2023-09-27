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
const bookList = document.querySelector('.book-list');

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
formReadStatus.addEventListener('click', toggleFormReadStatus);

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
   resetFormData();
   return [name, author, pages, status];
}

function resetFormData() {
   formBookName.value = '';
   formBookAuthor.value = '';
   formBookPageCount.value = '';
   formReadStatus.textContent = 'not read';
   formReadStatus.classList.remove('read');
   formReadStatus.classList.add('not-read');
}

function toggleFormReadStatus() {
   if (formReadStatus.textContent === 'not read') {
      formReadStatus.textContent = 'read';
      formReadStatus.classList.remove('not-read');
      formReadStatus.classList.add('read');
   } else {
      formReadStatus.textContent = 'not read';
      formReadStatus.classList.remove('read');
      formReadStatus.classList.add('not-read');
   }
}

function toggleCardReadStatus(container, icon, book) {
   if (container.classList.contains('read')) {
      container.classList.remove('read');
      container.classList.add('not-read');
      book.status = 'not-read';
      icon.src = './assets/not-read.svg';
   } else {
      container.classList.remove('not-read');
      container.classList.add('read');
      book.status = 'read';
      icon.src = './assets/read.svg';
   }
}

function displayEntireLibrary() {
   clearBookList();
   for (const book of myLibrary) {
      displayBook(book);
   }
}

function clearBookList() {
   bookList.innerHTML = '';
}

function displayBook(book) {
   // create each element
   const singleBook = document.createElement('div');
   const readStatusToggle = document.createElement('button');
   const readStatusIcon = document.createElement('img');
   const numPagesIconContainer = document.createElement('div');
   const numPagesIcon = document.createElement('img');
   const numPagesVal = document.createElement('h6');
   const deleteBookButton = document.createElement('button');
   const deleteBookIcon = document.createElement('img');
   const bookName = document.createElement('h2');
   const bookAuthor = document.createElement('h4');

   // assign attributes
   singleBook.classList.add('book');
   readStatusToggle.type = 'button';
   readStatusToggle.classList.add('border-item', 'read-status', book.status === 'read' ? 'read' : 'not-read');
   readStatusIcon.src = book.status === 'read' ? './assets/read.svg' : './assets/not-read.svg';
   readStatusIcon.alt = 'read status icon';
   numPagesIconContainer.classList.add('border-item', 'num-pages-icon');
   numPagesIcon.src = './assets/pages.svg';
   numPagesIcon.alt = 'pages icon';
   numPagesVal.classList.add('border-item', 'num-pages');
   deleteBookButton.type = 'button';
   deleteBookButton.classList.add('border-item', 'delete-book');
   deleteBookIcon.src = './assets/delete.svg';
   deleteBookIcon.alt = 'delete icon';
   bookName.classList.add('book-name');
   bookAuthor.classList.add('book-author');

   // add event listeners
   readStatusToggle.addEventListener('click', () => {
      toggleCardReadStatus(readStatusToggle, readStatusIcon, book);
   });

   // add content
   numPagesVal.textContent = book.pageCount;
   bookName.textContent = book.name;
   bookAuthor.textContent = book.author;

   // nest elements
   readStatusToggle.appendChild(readStatusIcon);
   numPagesIconContainer.appendChild(numPagesIcon);
   deleteBookButton.appendChild(deleteBookIcon);
   singleBook.append(readStatusToggle, numPagesIconContainer, numPagesVal, deleteBookButton, bookName, bookAuthor);

   // shove that book into the world!
   bookList.appendChild(singleBook);
}