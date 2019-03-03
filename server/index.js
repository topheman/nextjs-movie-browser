"use strict";

const express = require("express");
const next = require("next");
const nextI18NextMiddleware = require("next-i18next/middleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const url = require("url");

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
  server.get(
    "/movie/:id(\\d+)((-:slug)?)(/:subcategory(cast)?)(/:translationLanguageFullCode([a-z]{2}-[A-Z]{2})?)",
    (req, res, next) => {
      if (req.params.translationLanguageFullCode) {
        const redirectUrl = `${req.originalUrl
          .split("/")
          .slice(0, -1)
          .join("/")}?translationLanguageFullCode=${
          req.params.translationLanguageFullCode
        }`;
        return res.redirect(301, redirectUrl);
      }
      const subcategory =
        req.params.subcategory || req.query.subcategory || undefined;
      return app.render(
        req,
        res,
        "/movie" + (subcategory ? `-${subcategory}` : ""), // `/movie` or `/movie-cast`
        Object.assign(
          {
            id: req.params.id,
            translationLanguageFullCode: req.params.translationLanguageFullCode
          },
          req.query
        )
      );
    }
  );
  server.get(
    "/person/:id(\\d+)((-:slug)?)(/:translationLanguageFullCode([a-z]{2}-[A-Z]{2})?)",
    (req, res) => {
      if (req.params.translationLanguageFullCode) {
        const redirectUrl = `${req.originalUrl
          .split("/")
          .slice(0, -1)
          .join("/")}?translationLanguageFullCode=${
          req.params.translationLanguageFullCode
        }`;
        return res.redirect(301, redirectUrl);
      }
      return app.render(
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
      );
    }
  );
  server.get(
    "/tv/:id(\\d+)((-:slug)?)(/:subcategory(cast|seasons)?)(/:translationLanguageFullCode([a-z]{2}-[A-Z]{2})?)",
    (req, res, next) => {
      if (req.params.translationLanguageFullCode) {
        const redirectUrl = `${req.originalUrl
          .split("/")
          .slice(0, -1)
          .join("/")}?translationLanguageFullCode=${
          req.params.translationLanguageFullCode
        }`;
        return res.redirect(301, redirectUrl);
      }
      const subcategory =
        req.params.subcategory || req.query.subcategory || undefined;
      return app.render(
        req,
        res,
        "/tv" + (subcategory ? `-${subcategory}` : ""), // `/tv` or `/tv-cast`
        Object.assign(
          {
            id: req.params.id,
            translationLanguageFullCode: req.params.translationLanguageFullCode
          },
          req.query
        )
      );
    }
  );
  server.get("/*", (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const rootStaticFiles = ["/robots.txt", "/favicon.ico"];
    if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
      const localPath = path.join(
        __dirname,
        "..",
        "static",
        parsedUrl.pathname
      );
      app.serveStatic(req, res, localPath);
    } else {
      handle(req, res, parsedUrl);
    }
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log(
      `> Ready on http://localhost:${port} - mode: ${process.env.NODE_ENV}`
    );
  });
});
