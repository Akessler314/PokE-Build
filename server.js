// Requiring necessary npm packages
const express = require('express');
const session = require('express-session');
const expressHandle = require('express-handlebars');

const passport = require('./config/passport');

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require('./models');

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(
  express.urlencoded({ limit: '1mb', extended: true, parameterLimit: 1000000 })
);
app.use(express.static('public'));

// Initialize Passport with our browser, and start a new session
app.use(
  session({ secret: 'Dream Team', resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring Handlebars
app.engine('handlebars', expressHandle({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Requiring our routes
require('./routes/html-routes.js')(app);
require('./routes/auth-api-routes.js')(app);
require('./routes/creator-api-routes.js')(app);
require('./routes/pokemon-api-routes.js')(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});
