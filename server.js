const express = require('express');
const app = express();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//   next();
// });

const cors = require('cors');
const corsOption = {
  origin: "https://pai-auth-api.herokuapp.com"
};
app.use(cors(corsOption));
const path = require('path');
const serveStatic = require('serve-static');
app.use(serveStatic(__dirname + "/dist"));
const port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);
