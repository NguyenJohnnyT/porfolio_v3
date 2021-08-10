const path = require('path'); //guide express.static to public folder
const express = require('express'); //express server
const exphbs = require('express-handlebars'); // import express-handlebars
const routes = require('./controllers'); //import from controllers routes
const sequelize = require('./config/connection'); //import connection to db
// const exphbs = require('express-handlebars'); //if needed, to use with /utils


const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine); //use handlebars
app.set('view engine', 'handlebars'); //use handlebars

app.use(express.json()); //middleware request object as json object
app.use(express.urlencoded({ extended: true })); //middleware recognize request object as string/array
app.use(express.static(path.join(__dirname, 'public'))); //middleware to direct to public folder

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
