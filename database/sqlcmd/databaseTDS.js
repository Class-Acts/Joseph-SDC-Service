//This database connection works, but tedious does not implement pooling on its own
//This file is not used.

const {Connection, Request, TYPES} = require('tedious');

// Create connection to database
var config = {
  server: 'localhost',
  authentication: {
      type: 'default',
      options: {
          userName: 'student',
          password: 'Qandapass1234'
      }
  },
  options: {
    database: 'qanda',
    trustServerCertificate: true
  }
}

var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if(err) {
    console.log('Error: ', err)
  } else {
    // If no error, then good to go...
    executeStatement();
  }
});

connection.connect();

function executeStatement() {
  request = new Request(`select * from reports`, function(err, rowCount, i) {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + ' rows');
    }
  });

  request.on('row', function(columns) {
    columns.forEach(function(column) {
      console.log(column.value);
    });
  });

  connection.execSql(request);
}

module.exports = {
  connection: connection
};