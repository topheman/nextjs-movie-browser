#!/usr/bin/env node

"use strict";

const program = require("commander");
const path = require("path");
const fs = require("fs");

const localEnvFiles = [".env.local", ".env.test.local"].map(fileName =>
  path.resolve(__dirname, "..", fileName)
);

program
  .option("--api-key [apiKey]", "Init api key for dev environment")
  .parse(process.argv);

if (program.apiKey) {
  const data = `NEXTJS_APP_CLIENT_TMDB_API_KEY=${program.apiKey}`;
  localEnvFiles.map(filePath => {
    fs.writeFileSync(filePath, `${data}\n`);
  });
  console.log(
    `Adding : ${data} to:
    ${localEnvFiles.join("\n    ")}`
  );
} else {
  program.help();
}
