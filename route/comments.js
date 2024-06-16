const express = require('express');
const router = express.Router();
const comments = require('../data/comments.js');
const books = require('../data/books.js');

// GET /comments/
// Retrieves the comments
router.get('/', (req, res) => {
    const links = [
        {
          href: '/',
          rel: ':id',
          type: 'POST',
        },
      ];
    let data = comments;

    let userId = req.query.userId;
    let bookId = req.query.bookId;

    if (userId && bookId) {
        data = comments.filter(
        (comment) => comment.userId == userId && comment.bookId == bookId
        );
    } else if (userId && !bookId) {
        data = comments.filter((comment) => comment.userId == userId);
    } else if(bookId) {
        data = comments.filter((comment) => comment.bookId == bookId);
    }

    res.json({data, links});
});

// GET /comments/:id
// Retrieves the comment with the specified id.
router.get('/:id', (req, res) => {
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
    const comment = comments.find((c) => c.id == req.params.id);

    if (comment) res.json({comment, links});
    else next();
});

// post /comments
router.post('/', (req, res) => {
    const links = [
        {
          href: '/',
          rel: ':id',
          type: 'GET',
        },
      ];
    // the comment data that we want to create is inside the req.body
    if (req.body.userId && req.body.bookId && req.body.body) {
        // If the code gets to this point, we are good to create the comment
        const comment = {
        id: comments.length + 1,
        userId: req.body.userId,
        bookId: req.body.bookId,
        body: req.body.body,
        };

        comments.push(comment);
        res.json({comment, links});
    } else {
        res.status(400).json({ error: 'Insufficient Data' });
    }
});

// PATCH /comments/:id
// Used to update a comment with the specified id with a new body.
//PATCH Update a book
router.patch('/:id', (req, res, next) => {

    const links = [
        {
          href: `/${req.params.id}`,
          rel: '',
          type: 'DELETE',
        },
        {
          href: `/${req.params.id}`,
          rel: '',
          type: 'GET',
        },
      ];
    // Within the PATCH request route, we allow the client
    // to make changes to an existing comment in the database.
    const comment = comments.find((c, i) => {
        if (c.id == req.params.id) {
        for (const key in req.body) {
            // Applying the updates within the req.body to the in-memory book
            comments[i][key] = req.body[key];
        }
        return true;
        }
    });

    if (comment) {
        res.json({comment, links});
    } else {
        next();
    }
});

// DELETE Delete a Comment
router.delete('/:id', (req, res) => {
    const links = [
        {
          href: `/${req.params.id}`,
          rel: '',
          type: 'PATCH',
        },
        {
          href: `/${req.params.id}`,
          rel: '',
          type: 'GET',
        },
    ];
    // The DELETE request route simply removes a resource.
    const comment = comments.find((c, i) => {
        if (c.id == req.params.id) {
        comments.splice(i, 1);
        return true;
        }
    });
    if (comment) res.json({comment, links});
    else next();
});

module.exports = router;