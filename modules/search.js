const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017';


var createTextIndex = function (db, callback) {
  var collection = db.collection('service');
  collection.createIndex(
    { head_title: "text" }, function (err, result) {
      console.log(result);
      callback(result);
    });
};


const byName = (text, func) => {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db('carworkz');
    var collection = db.collection('service');
    createTextIndex(db, function () {
      collection.find({ '$text': { '$search': text } }).toArray(function (err, docs) {
        assert.equal(err, null);
        client.close();
        func(docs);
      });
    });
  });
}



const byLocation = (text, func) => {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db('carworkz');
    console.log("Connected correctly to server");
    var collection = db.collection('service');
    collection.find({ location_distance: text }).toArray(function (err, docs) {
      assert.equal(err, null);
      client.close();
      func(docs);
    });
  });
}

const byRating = (text, func) => {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db('carworkz');
    var collection = db.collection('service');
    collection.find({ number_rating: text }).toArray(function (err, docs) {
      assert.equal(err, null);
      client.close();
      func(docs);
    });
  });
}

const getService = (func) => {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db('carworkz');
    var collection = db.collection('service');
    collection.find().toArray(function (err, docs) {
      assert.equal(err, null);
      client.close();
      func(docs)
    });
  });
}

module.exports.getService = getService;
module.exports.byName = byName;
module.exports.byRating = byRating;
module.exports.byLocation = byLocation;