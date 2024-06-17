const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const userRoute = require('./route/users.js');
const bookRoute = require('./route/books.js');
const commentRoute = require('./route/comments.js');

// Body parser middlware
// we have access to the parsed data within our routes.
// The parsed data will be located in "req.body".
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//use the ejs template
// const path = require('path');
app.set(`view engine`, `ejs`);
app.use(express.static(`styles`));
// app.use(express.static(path.join(__dirname, `styles`)));

// New logging middleware to help us keep track of
// requests during testing!
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log('Containing the data:');
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

//routes
app.use('/books', bookRoute);
app.use('/comments', commentRoute);
app.use('/users', userRoute);

//mail page
app.get('/', (req, res) => {
    res.render('index', { title: `home`});
});


app.get(`/api`, (req,res) => {
    res.json({
      links: [
        {
          href: '/users',
          rel: 'api',
          type: 'GET',
        },
        {
        href: '/posts',
        rel: 'api',
        type: 'GET',
        },
        {
        href: '/comments',
        rel: 'api',
        type: 'GET',
        },
      ],
    });
});

// The only way this middlware runs is if a route handler function runs the "next()" function
app.use((err, req, res, next) => {
    res.status(err.status || 404).json({ error: err.message });
  });
  
app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
  });