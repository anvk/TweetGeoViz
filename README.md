TweetGeoViz
===========

[![Dependency Status](https://david-dm.org/JaredHawkins/TweetGeoViz.svg?style=flat-square)](https://david-dm.org/JaredHawkins/TweetGeoViz)
[![devDependency Status](https://david-dm.org/JaredHawkins/TweetGeoViz/dev-status.svg?style=flat-square)](https://david-dm.org/JaredHawkins/TweetGeoViz#info=devDependencies)

Visualization tool to view tweets by location and content.

------
A product of collaboration between HealthMap.org (Boston Children's Hospital), Mozilla Science Lab and our community.

![Screenshot 1](https://github.com/JaredHawkins/TweetGeoViz/blob/master/screenshots/1.png)

![Screenshot 2](https://github.com/JaredHawkins/TweetGeoViz/blob/master/screenshots/2.png)

![Screenshot 3](https://github.com/JaredHawkins/TweetGeoViz/blob/master/screenshots/3.png)

![Screenshot 4](https://github.com/JaredHawkins/TweetGeoViz/blob/master/screenshots/4.png)

# Getting Started

## Dependencies
This project uses mongodb to manage its database, node.js for a server, and npm to manage dependencies. Install these on your machine to start:

 - [MongoDB v3.2.7 and higher](http://docs.mongodb.org/manual/installation/)
 - [Node v0.12.7 and higher](http://nodejs.org/download/) (comes with npm)
 - [Control Tweets](https://db.tt/29prxPri) (courtesy of HealthMap)

## Technology Used for This Project
 - [MongoDB](https://www.mongodb.org/)
 - [Node](https://nodejs.org/en/)
 - [Webpack](https://webpack.github.io/)
 - [React](http://facebook.github.io/react/)
 - [Redux](http://redux.js.org/)
 - [Bootstrap] (http://getbootstrap.com/)
 - [Material UI] (http://www.material-ui.com/#/)
 - [ES6 by Babel](https://babeljs.io/)
 - [LESS](http://lesscss.org/)
 - [Express](http://expressjs.com/)
 - [OpenLayers](http://openlayers.org/)
 - [Polyglot] (http://airbnb.io/polyglot.js/)
 - [Mocha testing](http://mochajs.org/)
 - [Postman](http://www.getpostman.com/)
 - [ES2015](https://babeljs.io/docs/learn-es2015/)

## Setup
In the top directory of the project, run

```
npm install
```

And npm will install all the dependencies required by the app (listed in `package.json`).

Next up is database setup. After acquiring the batch of control tweets, unzip them anywhere, and at a terminal prompt, start mongo with the command:

```
mongod
```

And just leave that running while using the app. Now in another terminal window, navigate to wherever you unzipped the control tweets to, and load them into mongodb by running:

```
mongoimport --db twitter --collection ControlTweets --file healthmap_geoTweets.json
```

This'll create a database called `twitter`, and a collection of tweets called `ControlTweets`. Think of this as a single table, with one row for each tweet in the database.

The last step, is to index the database based on tweet content (for those new to databasing: this is sort of like putting all the database entries in order so they're fast to search, like having the names in a phonebook in order makes the phonebook fast to search). Open up the mongodb shell from the terminal:

```
mongo
```

then navigate to the `twitter` database you created, index it based on tweets, and exit (this step took ~10 minutes on my laptop, don't panic if it looks like it's doing nothing for a few minutes):

```
use twitter
db.ControlTweets.createIndex({ t: "text”, cr: 1 })
exit
```

App consists of 2 main components: Server and Client.

To start the Server, run in a separate window (by default it will run on `http://localhost:2063/`)

```
npm run server:start
```

To run the Client, run in a separate window (by default it will run on `http://localhost:8080/` or `http://localhost:8080/webpack-dev-server/` if you want live-reloading while developing)

```
npm run client:dev
```

And in a browser, navigate to `http://localhost:8080/`.

# Database Schema

## MongoDB

Each element in the database contains the following key / value pairs:

```
 "_id" : tweet ID (also the object ID for the mongo db)
 "lang" : language of tweet (should be mostly correct, but may have some mistakes)
 "loc" : user-entered location name
 "plt" : profile latitude coordinates
 "uid" : twitter user id
 "tlt" : tweet latitude
 "cc" : country code
 "f" : our own backup coding -- ignore
 "p" : twitter place ID (not sure if these can be looked up somehow via twitter)
 "t" : tweet text
 "cr" : time of the tweet in UTC (not converted to local time, so temporal analysis will not be very accurate)
 "pln" : profile longitude
 "tln" : tweet longitude
```

## geoJSON

The `/search` route in `routes.js` chews up tweets from the database into [geoJSON format](http://geojson.org/) (not strictly necessary at present, but we'll use this format for serving raw data from the database, and for potentially interfacing with other mapping tools in future). The specific format to be used contains only the minimal information necessary for plotting on a map:

```
{
  type: "FeatureCollection",
  features: [...]
}
```

where `features` is an array of objects of the format:

```
{
  type: 'Feature',
  id: item._id,
  geometry: {
    type: 'Point',
    coordinates: [tln, tlt]
  },
  properties: {
    timeStamp: item.cr,
    text: item.t
  }
}
```

where `tln` and `tlt` are the tweet longitude and latitude pulled from the database.

## Multi-Language Support

Supported languages:

 - English
 - Spanish
 - Russian
 
#### Adding Another Language

In order to add a new language bundle just extend `/client/src/constants/translations.js`. Then modify `/client/src/reducers/language.js` according to comments inside it.

## Available NPM Commands

To lint client source code

```
npm run lint
```

To run tests

```
npm test
```

To transpile and start Server API locally

```
npm run server:start
```

To transpile server code

```
npm run server:build
```

To start client for development

```
npm run client:dev
```

To build development version of the client

```
npm run client:build:dev
```

To build production version of the client (striped of PropType checks and uglified)

```
npm run client:build:prod
```
## Manual API Testing + Postman Files

To test API manually you can find Postman Collection and Environment files inside `postman/` folder.

## Changelog

see [CHANGELOG](./CHANGELOG.md)

## LICENSE

see [LICENSE](./LICENSE)
