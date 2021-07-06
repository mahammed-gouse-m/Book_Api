const express = require("express");

//Database
const database = require("./database");

//Initialization
const booky = express();
/*
Route        /
Description  Get all books
Access       PUBLIC
Parameter    none
Methods      GET
*/
booky.get("/" , (req, res) => {
    return res.json({ books: database.books });
});
/*
Route        /is
Description  Get specific books based on ISBN
Access       PUBLIC
Parameter    ISBN
Methods      GET
*/
booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN ===req.params.isbn
        );

        if( getSpecificBook.length === 0) {
            return res.json({error: `No book found for the ISBN of ${req.params.isbn}`,
        });
        }
        return res.json({ book: getSpecificBook });
});

/*
Route        /c
Description  Get specific books based on category
Access       PUBLIC
Parameter    category
Methods      GET
*/
booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );
    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for the category of ${req.params.category}`,
    });
    }
    return res.json({book: getSpecificBook});
});

/* 
route         /l
description   get list of books based on language
access        public
Parameter     Language
Methods       get
*/
booky.get("/l/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language)
    );
    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for the language of ${req.params.language}`,
    });
    }
    return res.json({book: getSpecificBook});
});

/* 
route         /author
description   get all authors
access        public
Parameter     none
Methods       get
*/
booky.get("/author", (req, res) => {
    return res.json({author: database.authors});
});

/* 
route         /author/book
description   list of authors based on books
access        public
Parameter     isbn
Methods       get
*/
booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) => 
    author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthor.length === 0) {
        return res.json({
            error: `No author found for the book of ${req.params.isbn}`,
    });
    }
    return res.json({author: getSpecificAuthor});
});

/* 
route         /author/n
description   to get Specific authors based on name 
access        public
Parameter     id
Methods       get
*/
booky.get("/author/n/:name", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.name.includes(req.params.name));
    if(getSpecificAuthor.length === 0) {
        return res.json({
            error: `No author found for the id of ${req.params.name}`,
    });
    }
    return res.json({author: getSpecificAuthor});
});

/* 
route         /publication
description   get all Publication
access        public
Parameter     none
Methods       get
*/
booky.get("/publication", (req, res) => {
    return res.json({ publication: database.publication})
});
/* 
route         /publication/n
description   to get Specific publication based on name 
access        public
Parameter     name
Methods       get
*/
booky.get("/publication/n/:name", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.name.includes(req.params.name)
    );
    if(getSpecificPublication.length === 0){
        return res.json({
            error: `No publication found for the name of ${req.params.name}`,
        });
    }
    return res.json({publication : getSpecificPublication});
});

/* 
route         /publication/book
description   to get Specific publication based on book
access        public
Parameter     books
Methods       get
*/
booky.get("/publication/book/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );
    if(getSpecificPublication.length === 0){
        return res.json({
            error: `No publication found for the isbn of ${req.params.isbn}`,
        });
    }
    return res.json({publication : getSpecificPublication});
});

booky.listen(5000, () => console.log("Hey server is running"));