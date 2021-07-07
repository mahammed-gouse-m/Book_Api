const express = require("express");

//Database
const database = require("./database");

//Initialization
const booky = express();

//configuration
booky.use(express.json());


/*
Route        /
Description  Get all books
Access       PUBLIc
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

/* 
route         /book/add
description   add new book
access        public
Parameter     none
Methods       post
*/
booky.post("/book/add/", (req, res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({ books: database.books});
});

/* 
route         /author/add
description   add new author
access        public
Parameter     none
Methods       post
*/
booky.post("/author/add/", (req, res) => {
    const { newAuthor } = req.body;
    database.author.push(newAuthor);
    return res.json({ authors: database.author});
});

/* 
route         /publication/add
description   add new publication
access        public
Parameter     none
Methods       post
*/
booky.post("/publication/add/", (req, res) => {
    const { newPublication } = req.body;
    database.publication.push(newPublication);
    return res.json({ publications: database.publication});
});

/* 
route         /book/update/title
description   update book title
access        public
Parameter     isbn
Methods       put
*/
booky.put("/book/update/title/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title = req.body.newBookTitle;
            return;
        }
    });
    return res.json({books: database.books});
});

/* 
route         /book/update/author
description   update or add new author for a book
access        public
Parameter     isbn
Methods       put
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
    
    //update book database

    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            return book.author.push(parseInt(req.params.authorId));
        }
    });
    //update author database
    database.author.forEach((author) => {
        if(author.id === parseInt(req.params.authorId))
        return author.books.push(req.params.isbn);
    });

    return res.json({books: database.books, author: database.author});
});

/* 
route         /author/update/name
description   update author name
access        public
Parameter     name
Methods       put
*/
booky.put("/author/update/name/:name", (req, res) => {
    database.author.forEach((author) => {
        if(author.name === req.params.name){
            author.name = req.body.newAuthorName;
            return;
        }
    });
    return res.json({author: database.author});
});

/* 
route         /publication/update/name
description   update publication name
access        public
Parameter     name
Methods       put
*/
booky.put("/publication/update/name/:name", (req, res) => {
    database.publication.forEach((publication) => {
        if(publication.name === req.params.name){
            publication.name = req.body.newPublicationName;
            return;
        }
    });
    return res.json({publication: database.publication});
});

booky.listen(5000, () => console.log("Hey server is running"));