# Helsinki city bike app

## Prerequisites
Before running the app you need to download the Helsinki city bike data to `server/src/resources` folder.

Download three datasets of journey data. The data is owned by City Bike Finland.

- https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

Also download the Helsinki city bike stations data.
- https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
- [License and information](https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902)

### Local MongoDB
This app uses a local database to store the data. For that reason, you need to have MongoDB on your computer before 
you can run this app. If you don't have it installed you can install it by following these instructions; 
 
#### MacOS
Install MongoDB by following these instructions:

_(If you are not comfortable using the terminal you can download MongoDB _Compass_ from [here](https://www.mongodb.com/download-center/compass).)_

1. **Install Homebrew**`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. **Find the MongoDB tap** `brew tap mongodb/brew`
3. **Install MongoDB** `brew install mongodb-community`
4. **Start MongoDB** `brew services run mongodb-community`
5. **Verify that MongoDB is running** `brew services list`
6. WhenMongoDB is running, you should be able to access the Mongo shell with the `mongosh` command.
7. Now your local MongoDB should be running 🎉
8. More info on installing MongoDB [here](https://zellwk.com/blog/install-mongodb/).

#### Windows
Follow [these](https://treehouse.github.io/installation-guides/windows/mongo-windows.html) instructions.



## Configuration


## How to run the app
## Tests

## Description
This app displays data from journeys made with Helsinki Region Transport’s (HSL) city bicycles and HSL bicycle
stations. The app validates data from CSV files using Apollo Server and MongoDB and creates a database using validated
data with two collections, journeys, and stations.

After the database is created and populated, the Apollo Server can be run on localhost:4000.

The client gets the data from the database using graphQL queries.
Data that the client can get:
- List of all journeys
- List of all stations
    - Total number of journeys starting from the specific station
    - Total number of journeys ending at the specific station
    - The average distance of a journey starting from the station
    - The average distance of a journey ending at the station
    - Top 5 most popular return stations for journeys starting from the station
    - Top 5 most popular departure stations for journeys ending at the station



## Technologies
- MongoDB
    - Mongoose
    - MongoDB Compass (Local database)
- Apollo Server
- GraphQL
- JavaScript (ES6)
- Babel
- csv parser

## TODO
- add tests
- add UI to the app
  - create single journey view
  - add loading bar
  - Error page
  - create map and show the stations on it
  - show top 5 stations with most journeys
  - create pagination for the stations and journeys
  - create a search bar for stations and journeys
  - create a filter for stations and journeys
  
