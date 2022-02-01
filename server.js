const express = require('express');
const path = require('path');
const cors = require('cors');
const serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
const corsOption = {
  origin: "https://pai-auth-api.herokuapp.com",
  credentials: true
};
app.use(cors(corsOption));
const port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);
