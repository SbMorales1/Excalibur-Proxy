"use strict";

const express = require("express");
const Unblocker = require("unblocker");
const app = express();
const path = require('path')
const unblocker = Unblocker({
 prefix: '/service/'
});

app.use(unblocker);

app.get("/", (req, res) =>
 res.sendFile(path.join(__dirname, '/index.html'))
);

// start the server and allow unblocker to proxy websockets:
const port = process.env.PORT || 8080;
app.listen(port).on("upgrade", unblocker.onUpgrade);

app.get("/service/:url", (req, res) =>
 res.redirect("/proxy/" + req.params.url)
);

app.get('*', function(req, res){
  res.status(404).send('Page Not Found');
});
console.log(`unblocker app live at http://studymath.xyz:${port}/`);