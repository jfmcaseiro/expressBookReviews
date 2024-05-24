const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
if (!username) {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
const user = users.find(user => user.username === username);

  // If user is not found or password does not match, return false
  if (!user || user.password !== password) {
    return false;
  }

  // Username and password match, return true
  return true;

}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.query.username;
  const password = req.query.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username, password)) {
    // Generate JWT token
    const accessToken = jwt.sign({ username }, 'access', { expiresIn: 60 * 60 });

    // Store token and username in session
    req.session.authorization = { accessToken, username };

    // User successfully logged in
    return res.status(200).json({ message: "User successfully logged in"});
  } else {
    // Invalid login
    return res.status(401).json({ message: "Invalid login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
