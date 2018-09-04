"use strict";

const hyphenopoly = require("hyphenopoly");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

const hyphenator = hyphenopoly.config({
    "require": ["de", "en-us"],
    "hyphen": "-",
    /*"exceptions": {
        "en-us": "en-han-ces"
    }*/
});

app.set('port', process.env.PORT || 8080);
app.set('hostname', process.env.HOSTNAME);

app.use(express.static('public'));

app.use(bodyParser.json());

app.post('/api/hyphenate', asyncMiddleware(async (req, res, next) => {
  const hyphenateText = await hyphenator.get("en-us");
  res.json({text: hyphenateText(req.body.text)});
}));

app.use((req, res) => {
  console.log("404 Page Not Found: " + req.method + " " + req.url);
  res.status(404);
  res.render('404');
});

app.listen(app.get('port'), app.get('hostname'), () =>
  console.log('Listening on port ' + app.get('port') + '!'));
