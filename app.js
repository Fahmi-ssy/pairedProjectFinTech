// app.js
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('./models');
const app = express();
const port = 3000;

// Configure session store
const sessionStore = new SequelizeStore({
  db: sequelize
});

// Set up session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));

// Middleware to pass the user session to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Make user available in views
  next();
});

// Set up middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Import and use routes
app.use('/', require('./routers'));

// Sync session store
sessionStore.sync();

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
