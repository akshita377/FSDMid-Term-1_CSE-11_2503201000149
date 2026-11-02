
const express = require('express');

const app = express();

// TASK 1: Configure JSON middleware
app.use(express.json());

// TASK 1: In-memory array to store books
let books = [
    {
        id: 101,
        title: "Java Programming",
        author: "Herbert Schildt",
        category: "Programming",
        quantity: 5,
        available: 5
    },
    {
        id: 102,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        quantity: 4,
        available: 4
    }
];

// TASK 2: POST API - Add a new book
app.post('/api/books', (req, res) => {

    const { id, title, author, category, quantity, available } = req.body;

    // Validate required fields
    if (
        id === undefined ||
        !title || !author || !category ||
        quantity === undefined ||
        available === undefined
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "ID must be a positive integer"
        });
    }

    // Validate quantity and available values
    if (
        !Number.isInteger(quantity) ||
        !Number.isInteger(available) ||
        quantity < 0 ||
        available < 0 ||
        available > quantity
    ) {
        return res.status(400).json({
            message: "Invalid quantity or available value"
        });
    }


    // Check duplicate ID
    const existingBook = books.find(book => book.id === id);

    if (existingBook) {
        return res.status(409).json({
            message: "Book ID already exists"
        });
    }

    const newBook = {
        id,
        title,
        author,
        category,
        quantity,
        available
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });

});


// TASK 3A: GET API - Retrieve all books
app.get('/api/books', (req, res) => {

    res.status(200).json(books);

});


// TASK 3B: GET API - Retrieve book by ID
app.get('/api/books/:id', (req, res) => {

    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.status(200).json(book);

});


// TASK 4: PUT API - Update book details using ID
app.put('/api/books/:id', (req, res) => {

    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, category, quantity, available } = req.body;

    // Validate required fields
    if (
        !title || !author || !category ||
        quantity === undefined ||
        available === undefined
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Validate quantity values
    if (
        !Number.isInteger(quantity) ||
        !Number.isInteger(available) ||
        quantity < 0 ||
        available < 0 ||
        available > quantity
    ) {
        return res.status(400).json({
            message: "Invalid quantity or available value"
        });
    }

    // Update book details
    book.title = title;
    book.author = author;
    book.category = category;
    book.quantity = quantity;
    book.available = available;

    res.status(200).json({
        message: "Book updated successfully",
        book: book
    });

});


// Start server on port 3000
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

