const express = require('express');
const router = express.Router();
const users = require('../data/users.js');
const comments = require('../data/comments.js');

//GET route to get all user data
router.get('/', (req, res) => {
    const links = [
      {
        href: '/',
        rel: ':id',
        type: 'POST',
      },
    ];
  
    res.json({ users, links });
});
// GET /users/:id/comments
// Retrieves all comments made by a user with the specified id.
router.get('/:id/comments', (req, res) => {
    let foundComments;
  
    if (req.query.postId) {
      foundComments = comments.filter(
        (comment) =>
          comment.userId == req.params.id && comment.postId == req.query.postId
      );
    } else {
      foundComments = comments.filter(
        (comment) => comment.userId == req.params.id
      );
    }
  
    res.json(foundComments);
});
// GET router to get a user by ID
router.get('/:id', (req, res, next) => {
    // Using the Array.find method to find the user with the same id as the one sent with the request
    const user = users.find((u) => u.id == req.params.id);
  
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
  
    if (user) res.json({ user, links });
    else next();
});

// post Create a User
router.post('/', (req, res) => {
    const links = [
        {
          href: '/',
          rel: ':id',
          type: 'GET',
        },
      ];
    if (req.body.name && req.body.username && req.body.email) {
        if (users.find((u) => u.username === req.body.username)) {
        // The above returns an object, we found an existing user with the same username. So it's a no go
        res.json({ error: 'Username Already Taken' });
        return;
        }

        // If the code gets to this point, we are good to create the user
        const user = {
        id: users.length + 1,
        name: req.body.name,
        };

        users.push(user);
        res.json({user, links});
    } else {
        res.status(400).json({ error: 'Insufficient Data' });
    }
});

//PATCH Update a User
router
    .patch('/:id', (req, res, next) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing user in the database.
    const user = users.find((u, i) => {
        if (u.id == req.params.id) {
        for (const key in req.body) {
            // Applying the updates within the req.body to the in-memory user
            users[i][key] = req.body[key];
        }
        return true;
        }
    });

    const links = [
        {
          href: `/${req.params.id}`,
          rel: '',
          type: 'GET',
        },
        {
          href: `/${req.params.id}`,
          rel: '',
          type: 'DELETE',
        },
      ];

    if (user) {
        res.json({user, links});
    } else {
        next();
    }
});

// Delete a user
router
    .delete('/:id', (req, res, next) => {
    // The DELETE request route simply removes a resource.
    const user = users.find((u, i) => {
        if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
        }
    });

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

    if (user) res.json({user, links});
      else next();
});

module.exports = router;