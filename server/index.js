const express = require("express");
const next = require("next");
const { loadConfig } = require("../scripts/config/next-env");

// load .env configuration
loadConfig();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get("/*", (req, res) => handle(req, res));
  server.listen(port, err => {
    if (err) throw err;
    console.log(
      `> Ready on http://localhost:${port} - mode: ${process.env.NODE_ENV}`
    );
  });
});
