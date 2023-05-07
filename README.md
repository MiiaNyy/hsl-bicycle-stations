# Helsinki city bike app

Clone the repository to your local machine.

```bash
git clone https://github.com/MiiaNyy/helsinki-city-bike-app.git
```

## Prerequisites
Before running the app you need to download the Helsinki city bicycle journeys and station data to the project. The data is owned by City Bike Finland.

### Go to server

```bash
cd server
```

### Download datasets 

```bash
npm run download-data
```

- [License and information](https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902)

### Local MongoDB
This app uses a local database to store the data. For that reason, you need to have MongoDB on your computer before 
you can run this app.  

If you are not comfortable using the terminal you can download MongoDB _Compass_ from [here](https://www.mongodb.com/download-center/compass).

### MacOS
Install MongoDB by following these instructions:

1. **Install Homebrew** `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
2. **Find the MongoDB tap** `brew tap mongodb/brew`
3. **Install MongoDB** `brew install mongodb-community`
4. **Start MongoDB** `brew services run mongodb-community`
5. **Verify that MongoDB is running** `brew services list`
6. When MongoDB is running, you should be able to access the Mongo shell with the `mongosh` command.
7. Now your local MongoDB should be running 🎉
8. More info on installing MongoDB [here](https://zellwk.com/blog/install-mongodb/).

### Windows
Follow [these](https://treehouse.github.io/installation-guides/windows/mongo-windows.html) instructions.

## Configuration

If you installed MongoDB via Homebrew, you are good to go 🎉!

If you installed MongoDB via Compass, you need to configure it.
1. Open MongoDB Compass.
2. Set `HostName` to `localhost`and `Port` to `27017`.
   1. These values are the default for all local MongoDB connections
3. Press connect.
4. Now you can browse the database hslBicycles and see the data after you first run the app.

## How to run the app

Before running app, make sure you have downloaded the data to `server/src/resources` folder and configured MongoDB.



### Start server install all of the dependecies

```bash
cd server && npm install
```

### Add HSL Bicycle journey and station data to database

```bash
npm run add-data
```
You should see messages telling how many documents are being validated and added to database. 
This should take few minutes to complete. 
After you see this messages all the data is added to database:

```bash
🎊 Stream ended!! All journeys added to db!
```

### Install all dependencies on the server, run the following command:
```bash

npm run start
```

### Start client

```bash
cd client && npm install && npm start
```
After that you can access the app at `http://localhost:3000`.


## Description
This app displays data from journeys made with Helsinki Region Transport’s (HSL) city bicycles during 1.5. - 31.7.2021 and HSL bicycle
stations. 

The app validates data from CSV files using Apollo Server and MongoDB and creates a database using validated
data with two collections, journeys, and stations.

After the database is created and populated, the app can be accessed at `localhost:3000`.

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
- Client
  - Apollo Client
  - React
  - CSS3
  - Bootstrap
- Server
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
- show top 5 stations with most journeys
- Journey list view
  - Filter journeys distance
    - longest to shortest
    - shortest to longest
  - Filter journeys duration
    - longest to shortest
    - shortest to longest
- Single station view
  - show all journeys by month
  - Filter all the calculations for the station by month
- create a search bar for stations and journeys
- create a filter for stations and journeys
- UI for adding journeys/stations
  
