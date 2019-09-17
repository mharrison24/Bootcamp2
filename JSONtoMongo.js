'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/

mongoose.connect('mongodb+srv://mharrison24:ENQcnS6SwCKWfloO@mattscluster-oi9wd.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */
    fs.readFile('listings.json', 'utf8', function(err, data) 
    {

    //Check for errors

        if (err) throw err;


        //DBObject dbObject = (DBObject) JSON.parse(data);
    
        //dbObject.forEach(function(element)
         //var newListing = dbObject(element);
        //    var newListing = mongoose.model(element, listingSchema)
        
        var ListingData = JSON.parse(data);
        for (var i = 0; i < ListingData.entries.length; i++)
        {
            var newListing = new Listing;
            newListing.code = ListingData.entries[i].code;
            newListing.name = ListingData.entries[i].name;
            newListing.coordinates = ListingData.entries[i].coordinates;
            newListing.address = ListingData.entries[i].address;
            newListing.save(function(err, Listing)
            {
                if (err) throw err;
            })
        }

    });
    
});


/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */