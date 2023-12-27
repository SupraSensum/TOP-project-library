class Book {
   constructor(name, author, pageCount, status) {
      this.author = author;
      this.name = name;
      this.pageCount = pageCount;
      this.status = status;
   }

   delete(index) {
      myLibrary.splice(Number(index), 1);
      displayEntireLibrary();
   }
}