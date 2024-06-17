const express = require('express');
const router = express.Router();
const users = require('../data/users.js');
const comments = require('../data/comments.js');
const books = require('../data/books.js')

//GET route to get all books in EJS template

router.get(`/`, (req, res) => {
  res.render('books', {title: "Book List", books: books });
});
//get route to show REST links
router.get('/api', (req, res) => {
  const links = [
    {
      href: 'books/:id',
      rel: ':id',
      type: 'GET',
    },
  ];

  let data;

  if (req.query.userId) {
    data = books.filter((books) => books.userId == req.query.userId);
  } else {
    data = books;
  }

  res.json({ data, links });
});

// GET /books/:id/comments
// Retrieves all comments made on the books with the specified id.
router.get('/:id/comments', (req, res) => {
  let foundComments;

  if (req.query.userId) {
    foundComments = comments.filter(
      (comment) =>
        comment.bookId == req.params.id && comment.userId == req.query.userId
    );
  } else {
    foundComments = comments.filter(
      (comment) => comment.bookId == req.params.id
    );
  }

  res.json(foundComments);
});

// GET route to get a book by ID
router.get('/:id', (req, res, next) => {
  // Using the Array.find method to find the user with the same id as the one sent with the request
  const book = books.find((p) => p.id == req.params.id);

  const links = [
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'PATCH',
    },
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'DELETE',
    },
  ];

  if (book) res.json({ book, links });
  else next();
});

// books Create a books
router.post('/', (req, res) => {
  // Within the books request we will create a new books.
  // The client will pass us data and we'll push that data into our psots array.
  // the books data that we want to create is inside the req.body
  if (req.body.userId && req.body.title && req.body.content) {
    // If the code gets to this point, we are good to create the books
    const books = {
      id: books.length + 1,
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
    };

    books.push(books);
    res.json(books);
  } else {
    res.status(400).json({ error: 'Insufficient Data' });
  }
});

//PATCH Update a books
router.patch('/:id', (req, res, next) => {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing user in the database.
  const books = books.find((p, i) => {
    if (p.id == req.params.id) {
      for (const key in req.body) {
        // Applying the updates within the req.body to the in-memory books
        books[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (books) {
    res.json(books);
  } else {
    next();
  }
});

// DELETE Delete a books
router.delete('/:id', (req, res) => {
  // The DELETE request route simply removes a resource.
  const books = books.find((p, i) => {
    if (p.id == req.params.id) {
      books.splice(i, 1);
      return true;
    }
  });

  if (books) res.json(books);
  else next();
});

module.exports = router;