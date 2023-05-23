# Helsinki city bike app

Clone the repository to your local machine.

```bash
git clone https://github.com/miiakivi/helsinki-city-bike-app.git
```

# Prerequisites
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

### Start the server
```bash
npm run start
```

### Open another terminal, navigate to client, install all of the dependencies and start client

```bash
cd client && npm install && npm start
```
After that you can access the app at `http://localhost:3000`.


# Description
This project is a full-stack JavaScript application that showcases data from journeys made with Helsinki Region Transport’s (HSL) city bicycles between 1.5. - 31.7.2021, along with information about HSL bicycle stations. 

The application utilizes the npm console command to download CSV files from the web and save them to the `server/src/resources directory`. To ensure data integrity, the app includes a command that validates the downloaded data and adds it to a local MongoDB database. The database consists of two collections: **journeys** and **stations**.

Once the database is created and populated, the application can be accessed locally at `http://localhost:3000`. The client-side of the application retrieves data from the database using GraphQL queries.

This project serves as my first major full-stack application, combining Node.js on the backend and React on the frontend. The primary objectives were to gain practical experience in developing a full-stack JavaScript project and to further my understanding of GraphQL, a powerful query language for APIs. To handle data storage and retrieval, a local MongoDB database was utilized.

One of the main focuses of this project was to practice validating and handling data, particularly data sourced from CSV files. By implementing data validation processes, the application ensures the integrity and accuracy of the information stored in the database.

Additionally, this project provided an opportunity to enhance my UI design skills by utilizing Figma, a popular design tool. The goal was to create a larger-scale application while maintaining a clean and organized codebase.

## [Check the Figma design](https://www.figma.com/file/SYowhuPeCasVdhQwBlak7c/hsl-bicycle-app?type=design&node-id=0%3A1&t=1liz1qXOwoUYa3GN-1)
# Data Available to the Client
The client interface provides various data points related to the journeys and stations. Users can access the following information:

- **List of all journeys**: Displaying all recorded journeys.
- **List of all stations**: Showing information about every station, including:
- Total number of journeys starting from a specific station.
- Total number of journeys ending at a specific station.
- The average distance of a journey starting from the station.
- The average distance of a journey ending at the station.
- The top 5 most popular return stations for journeys starting from the station.
- The top 5 most popular departure stations for journeys ending at the station.

# Technologies
- Client
  - Apollo Client
  - React
  - CSS3
  - Bootstrap
  - Figma
- Server
  - MongoDB
      - Mongoose
      - MongoDB Compass (Local database)
  - Apollo Server
  - GraphQL
  - JavaScript (ES6)
  - Babel
  - csv parser

# TODO
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
  
