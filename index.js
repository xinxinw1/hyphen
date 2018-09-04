"use strict";

const hyphenopoly = require("hyphenopoly");
const express = require('express');
const app = express();

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

const hyphenator = hyphenopoly.config({
    "require": ["de", "en-us"],
    "hyphen": "•",
    "exceptions": {
        "en-us": "en-han-ces"
    }
});

app.use(express.static('public'));

app.get('/api/hyphenate', asyncMiddleware(async (req, res, next) =>
  const hyphenateText = await hyphenator.get("en-us");
  res.json({text: hyphenateText(text)});
}));
