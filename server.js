const express = require("express");
const http = require("http");
const { createBareServer } = require("@tomphttp/bare-server-node");
const path = require("path");

const app = express();
const bare = createBareServer("/bare/");

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer((req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
