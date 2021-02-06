// const sql = require('mssql')
// const config = {
//   user: 'student',
//   password: 'Qandapass1234',
//   server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
//   database: 'qanda',
// };


// async () => {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect('mssql://student:Qandapass1234@localhost/qanda')
//         const result = await sql.query`select * from Products where id = ${value}`
//         console.dir(result)
//     } catch (err) {
//         // ... error checks
//     }
// }

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
// var config = {
//   server: 'localhost',
//   authentication: {
//       type: 'default',
//       options: {
//           userName: 'student', // update me
//           password: 'Qandapass1234' // update me
//           trustServerCertificate: true
//       }
//   },
//   options: {
//       database: 'qanda'
//   }
// }
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