const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    // Check if the username already exists

    if (!req.query.username) {
        return res.status(300).json({ message: "Missing user name" });
    }
    if (!req.query.password) {
        return res.status(300).json({ message: "Missing password" });
    }

    //const userExists = [];
    const userExists = users.some(user => user.username === req.query.username);

    if (userExists) {
        res.status(300).json({ message: "User already registered" });
      }
    if (!userExists) {
        users.push({"username":req.query.username,"password":req.query.password});
        res.send("The user" + (' ')+ (req.query.username) + " has been added!")
    }
});

// CODE FOR TASK 1 -----------------------------------
// Get the book list available in the shop
//public_users.get('/',function (req, res) {
//  //Write your code here
//  res.send(JSON.stringify(books,null,4))
//});

// CODE FOR TASK 10 -----------------------------------
// Get the book list available in the shop as a promise
public_users.get('/', async (req, res) => {
    try {
      const booksList = await getBooks();
      res.send(JSON.stringify(booksList, null, 4));
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve books list" });
    }
  });
  
  // Function to get books as a promise
  function getBooks() {
    return new Promise((resolve, reject) => {
      if (books) {
        resolve(books);
      } else {
        reject("No books found");
      }
    });
  }

// CODE FOR TASK 2 -----------------------------------
// Get book details based on ISBN
//public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
//    const isbn = req.params.isbn;
//    res.send(books[isbn])
  //return res.status(300).json({message: "Yet to be implemented"});
// });


// CODE FOR TASK 11 -----------------------------------
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
      const booksdetails = await getDetails(isbn);
      res.send(JSON.stringify(booksdetails, null, 4));
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve books details" });
    }
  });
  
  // Function to get books as a promise
  function getDetails(isbn) {
    return new Promise((resolve, reject) => {
      if (isbn) {
        resolve(books[isbn]);
      } else {
        reject("No isbn found");
      }
    });
  }

// CODE FOR TASK 3 -----------------------------------
// Get book details based on author
//public_users.get('/author/:author',function (req, res) {
  //Write your code here
//  const author = req.params.author;
//  const booksByAuthor = [];

//  for (let key in books) {
//    if (books[key].author === author) {
//      booksByAuthor.push(books[key]);
//    }
//  }

//  if (booksByAuthor.length > 0) {
//    res.send(booksByAuthor);
//  } else {
//    res.status(401).json({message: "The author is not in the database"});
//  }
//});

// CODE FOR TASK 12 -----------------------------------
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    const booksByAuthor = [];

    try {
      const bookauthor = await getBooksByAuthor(author);
      res.send(JSON.stringify(bookauthor, null, 4));
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve books by author"});
    }
  });
  
  function getBooksByAuthor(author) {
    return new Promise((resolve, reject) => {
      const booksByAuthor = [];
  
      for (let key in books) {
        if (books[key].author === author) {
          booksByAuthor.push(books[key]);
        }
      }
  
      if (booksByAuthor.length > 0) {
        resolve(booksByAuthor);
      } else {
        reject("No books found by this author");
      }
    });
  }




// CODE FOR TASK 4 -----------------------------------
// Get all books based on title
//public_users.get('/title/:title',function (req, res) {
  //Write your code here
//  const title = req.params.title;
//  let foundBook = null;

//  for (let key in books) {
//    if (books[key].title === title) {
//      foundBook = books[key];
//      break;
//    }
//  }

//  if (foundBook) {
//    res.send(foundBook);
//  } else {
//    res.status(401).json({ message: "Book not found" });
//  }
  //return res.status(300).json({message: "Yet to be implemented"});
//});

// CODE FOR TASK 13 -----------------------------------
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    
    try {
      const booksTitle = await getTitle(title);
      res.send(JSON.stringify(booksTitle, null, 4));
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve books details" });
    }
  });
  
  //Function to get a book based on the title 
  function getTitle(title) {
    return new Promise((resolve, reject) => {
      let foundBook = null;
  
      for (let key in books) {
        if (books[key].title === title) {
          foundBook = books[key];
          break;
        }
      }
  
      if (foundBook) {
        resolve(foundBook);
      } else {
        reject("Book not found");
      }
    });
  }



//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(books[isbn].reviews);
  } else {
    res.status(401).json({ message: "Book not found" });
  }

  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
