var express = require("express");
var router = express.Router();

let books = [
  {
    isbn: "9781593275846",
    title: "Eloquent JavaScript, Second Edition",
    author: "Marijn Haverbeke",
    publish_date: "2014-12-14",
    publisher: "No Starch Press",
    numOfPages: 472,
  },
  {
    isbn: "9781449331818",
    title: "Learning JavaScript Design Patterns",
    author: "Addy Osmani",
    publish_date: "2012-07-01",
    publisher: "O'Reilly Media",
    numOfPages: 254,
  },
  {
    isbn: "9781449365035",
    title: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    publish_date: "2014-02-01",
    publisher: "O'Reilly Media",
    numOfPages: 460,
  },
];

router.post("/", (req, res) => {
  const book = req.body;

  // output the book to the console for debugging
  console.log(book);
  books.push(book);

  res.send("Book is added to the database");
});

router.get("/", (req, res) => {
  res.json(books);
});

router.get("/:isbn", (req, res) => {
  // reading isbn from the URL
  const isbn = req.params.isbn;

  // searching books for the isbn
  for (let book of books) {
    if (book.isbn === isbn) {
      res.json(book);
      return;
    }
  }

  // sending 404 when not found something is a good practice
  res.status(404).send("Book not found");
});

router.delete("/:isbn", (req, res) => {
  // reading isbn from the URL
  const isbn = req.params.isbn;

  // remove item from the books array
  books = books.filter((i) => {
    if (i.isbn !== isbn) {
      return true;
    }

    return false;
  });

  // sending 404 when not found something is a good practice
  res.send("Book is deleted");
});

router.post("/:isbn", (req, res) => {
  // reading isbn from the URL
  const isbn = req.params.isbn;
  const newBook = req.body;

  // remove item from the books array
  for (let i = 0; i < books.length; i++) {
    let book = books[i];

    if (book.isbn === isbn) {
      books[i] = newBook;
    }
  }

  // sending 404 when not found something is a good practice
  res.send("Book is edited");
});

module.exports = router;
