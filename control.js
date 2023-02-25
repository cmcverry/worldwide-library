
// Setup
var mysql = require('./database/db-connector.js');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.set('port', 2098);

var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({
  extname:".hbs"
}));
app.set('view engine', '.hbs');
app.set('mysql', mysql);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));


// Routes
app.use('/', require('./index.js'));
app.use('/patron_account', require('./patron_account.js'));
app.use('/books', require('./books.js'));
app.use('/create_patron', require('./create_patron.js'));
app.use('/employees', require('./employees.js'));
app.use('/genres', require('./genres.js'));
app.use('/patrons', require('./patrons.js'));
app.use('/rooms', require('./rooms.js'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

//Listener

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
