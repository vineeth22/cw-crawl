
const request = require('request');
const cheerio = require('cheerio');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';

const putData = (data) => {
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db('carworkz');
    db.collection('service').insertMany(data, (err, r) => {
      assert.equal(null, err);
      client.close();
    });
  });
};

const getData = (pageNumber, func) => {

  request('https://www.carworkz.com/mumbai/regular-service?format=json&page=' + pageNumber, (error, response, body) => {
    if (error) {
      console.log('error:', error);
    }

    const jsonBody = JSON.parse(body);
    const $ = cheerio.load(jsonBody.listing);

    const count = [];
    count.head_title = 0;
    count.location_distance = 0;
    count.number_rating = 0;
    count.yrs_exp = 0;
    count.per_votes = 0;
    count.txt_votes = 0;
    const data = [];

    $('.head_title').each(() => {
      if (!data[count.head_title]) {
        data.push({});
      }
      data[count.head_title++].head_title = $(this).text();
    });
    $('.location_distance').each(() => {
      if (!data[count.location_distance]) {
        data.push({});
      }
      data[count.location_distance++].location_distance = $(this).text();
    });

    $('.number_rating').each(() => {
      if (!data[count.number_rating]) {
        data.push({});
      }
      data[count.number_rating++].number_rating = $(this).text();
    });

    $('.yrs_exp').each(() => {
      if (!data[count.yrs_exp]) {
        data.push({});
      }
      data[count.yrs_exp++].yrs_exp = $(this).text();
    });

    $('.per_votes').each(() => {
      if (!data[count.per_votes]) {
        data.push({});
      }
      data[count.per_votes++].per_votes = $(this).text();
    });

    func(data);
  });
};

const getPageCount = (func) => {
  request('https://www.carworkz.com/mumbai/regular-service?format=json&page=1', (error, response, body) => {
    if (error) {
      console.log('error:', error);
    }
    const jsonBody = JSON.parse(body);
    const pageCount = jsonBody.meta['X-Total-Page'];
    func(pageCount);
  });
};

const crawl = () => {
  getPageCount((pageCount) => {
    for (let i = 1; i <= pageCount; i++) {
      getData(i, (data) => {
        putData(data);
      });
    }
  });
}
