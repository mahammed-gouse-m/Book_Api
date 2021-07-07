const books = [ 
    {
    ISBN: "12345Book", 
    title: "Getting started with MERN",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 250,
    author: [1,2],
    publications: [1],
    category: ["tech", "Programming", "education", "thriller"],
     },
];

const author = [
    {
        id:1 ,
        name : "Gouse",
        books :["12345Book"],
    },
    {
        id:2 ,
        name : "Azam",
        books :["12345Book"]
    },
];
const publication = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"],
    },
];

module.exports = {books, author, publication};