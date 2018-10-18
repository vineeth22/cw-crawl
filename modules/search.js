const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017';


var createTextIndex = function(db, callback) {
  // Get the restaurants collection
  var collection = db.collection('service');
  // Create the index
  collection.createIndex(
    { head_title : "text"}, function(err, result) {
    console.log(result);
    callback(result);
  });
};


// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  const db = client.db('carworkz');
  console.log("Connected correctly to server");
  createTextIndex(db, function() {
    client.close();
  });
});

const byName = (text, func) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db('carworkz');
    console.log("Connected correctly to server");
    var collection = db.collection('service');
    // Find some documents
    collection.find({ '$text': {'$search' : text } } ).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      client.close();
      func(docs);
    });      
  }); 
}



const byLocation = (text, func) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db('carworkz');
    console.log("Connected correctly to server");
    var collection = db.collection('service');
    // Find some documents
    collection.find({ location_distance : text} ).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      client.close();
      func(docs);
    });      
  }); 
} 

const byRating = (text, func) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db('carworkz');
    console.log("Connected correctly to server");
    var collection = db.collection('service');
    // Find some documents
    collection.find({ number_rating : text} ).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      client.close();
      func(docs);
    });      
  }); 
} 

const getService = (func) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db('carworkz');
    console.log("Connected correctly to server");
    var collection = db.collection('service');
    // Find some documents
    collection.find().toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      //console.log(docs);
      client.close();
      func(docs)
    });      
  }); 
}
//byRating('5')

module.exports.getService = getService;
module.exports.byName = byName;
module.exports.byRating = byRating;
module.exports.byLocation = byLocation;