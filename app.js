const express = require('express');
const service = require('./modules/search');
const crawl = require('./modules/crawler');
const app = express();
crawl.crawl();

const port = 3000;
app.get('/search/name/:str', (req, res) => {
  console.log(req.params.str);
  service.byName(req.params.str, (data) => {
    res.send(data);
  });
});

app.get('/search/rating/:str', (req, res) => {
  console.log(req.params.str);
  service.byRating(req.params.str, (data) => {
    res.send(data);
  });
});

app.get('/search/location/:str', (req, res) => {
  console.log(req.params.str);
  service.byLocation(req.params.str, (data) => {
    res.send(data);
  });
});

app.get('/', (req, res) => {
  service.getService((data) => {
    res.send(data);
  });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
