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

const byName = (text) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db('carworkz');
    console.log("Connected correctly to server");
    var collection = db.collection('service');
    // Find some documents
    collection.find({ '$text': {'$search' : text } } ).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      client.close();
    });      
  }); 
}



const byLocation = (text) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db('carworkz');
    console.log("Connected correctly to server");
    var collection = db.collection('service');
    // Find some documents
    collection.find({ location_distance : text} ).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      client.close();
    });      
  }); 
} 

const byRating = (text) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db('carworkz');
    console.log("Connected correctly to server");
    var collection = db.collection('service');
    // Find some documents
    collection.find({ number_rating : text} ).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      client.close();
    });      
  }); 
} 


//byRating('5')