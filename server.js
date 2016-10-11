var express = require('express'),
    path = require('path'),
    http = require('http'),
    util = require('util'),
    rdb = require('rethinkdb'),
    cargo = require('./routes/cargos');
//  wine = require('./routes/cargos');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

//app.get('/wines', wine.findAll);
//app.get('/wines/:id', wine.findById);
//app.post('/wines', wine.addWine);
//app.put('/wines/:id', wine.updateWine);
//app.delete('/wines/:id', wine.deleteWine);

app.get('/cargos', cargo.findAll);
app.get('/cargos/:id', cargo.findById);
app.post('/cargos', cargo.addCargo);
app.put('/cargos/:id', cargo.updateCargo);
app.delete('/cargos/:id', cargo.deleteCargo);

// #### RethinkDB connection details

var dbConfig = {
  host : process.env.RDB_HOST || 'localhost',
  port : parseInt(process.env.RDB_PORT) || 28015,
  db   : process.env.RDB_DB || 'cargo',
//db   : process.env.RDB_DB || 'winecellar',
};  

// Using a single db connection for the app
rdb.connect({host: dbConfig.host, port: dbConfig.port}, function(err, connection) {
  if(err) {
    console.log("ERROR: %s:%s", err.name, err.msg);
    process.exit(1);
  }
  else {
    // set up the database
    cargo.setupDB(dbConfig, connection);
    // set up the default database for the connection
    connection.use(dbConfig['db']);
    // set up the module global connection
    cargo.connection = connection;
    // start serving requests
    http.createServer(app).listen(app.get('port'), function () {
      console.log("Express server listening on port " + app.get('port'));
    });
  }
});
