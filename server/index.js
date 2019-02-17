const express = require("express");
const next = require("next");
const nextI18NextMiddleware = require("next-i18next/middleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const { loadConfig } = require("../scripts/config/next-env");
const nextI18next = require("../i18n");
const { languageManagerMiddleware } = require("../src/services/i18n/utils");

// load .env configuration
loadConfig();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());
  // will correctly init the cookie for the i18n on first load
  server.use(
    languageManagerMiddleware({
      defaultLanguageShortCode: nextI18next.DEFAULT_LANGUAGE_SHORT_CODE,
      defaultLanguageFullCode: nextI18next.DEFAULT_LANGUAGE_FULL_CODE
    })
  );
  nextI18NextMiddleware(nextI18next, app, server);
  server.get("/robots.txt", (req, res) => {
    const options = {
      root: path.resolve(__dirname, "..", "static/"),
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      }
    };
    return res.status(200).sendFile("robots.txt", options);
  });
  server.get(
    "/movie/:id(\\d+)((-:slug)?)(/:translationLanguageFullCode?)",
    (req, res) =>
      app.render(
        req,
        res,
        "/movie",
        Object.assign(
          {
            id: req.params.id,
            translationLanguageFullCode: req.params.translationLanguageFullCode
          },
          req.query
        )
      )
  );
  server.get(
    "/person/:id(\\d+)((-:slug)?)(/:translationLanguageFullCode?)",
    (req, res) =>
      app.render(
        req,
        res,
        "/person",
        Object.assign(
          {
            id: req.params.id,
            translationLanguageFullCode: req.params.translationLanguageFullCode
          },
          req.query
        )
      )
  );
  server.get("/*", (req, res) => handle(req, res));
  server.listen(port, err => {
    if (err) throw err;
    console.log(
      `> Ready on http://localhost:${port} - mode: ${
        process.env.NODE_ENV
      } - with NEXTJS_APP_CLIENT_BASE_PATH${
        process.env.NEXTJS_APP_CLIENT_BASE_PATH
          ? `=${process.env.NEXTJS_APP_CLIENT_BASE_PATH}`
          : " not set, will use hostname"
      }`
    );
  });
});
