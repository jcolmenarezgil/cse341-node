const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Suite to keep the books
let books = [];

app.use(cors());

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/books', (req, res) => {
    res.json(books);
})

app.post('/book', (req, res) => {
    // We will be coding here
    const book = req.body;

    // Output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

app.get('/book/:isbn', (req, res) => {
    // Reading ISBN form the URL
    const isbn = req.params.isbn;

    // Searching books for the isbn
    for(let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    // Sending 404 when not found somethinh is a good practice
    res.status(404).send('Book not found');
});

app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    // Remove item from the books array
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }
        return false;
    });

    res.send('Book is deleted');
});

app.post('/book/:isbn', (req, res) => {
    // Reading isbn form the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    // Remove item from the array
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    res.send('Book is edited');
});


app.listen(port, () => {
    console.log(`Hello world app listening on port ${port}`);
})