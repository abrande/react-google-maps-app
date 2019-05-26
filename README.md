# React-Redux Google Maps App

##Table of contents
* [General Info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [See the Project](#see-the-project)

##General Info
This application uses google maps to search for local places around you, get driving directions, and save them to a simple list. 
 
##Technologies
Project is created with:
 * [react-google-maps](https://github.com/tomchentw/react-google-maps)
 * React: 16.8.6
 * Redux: 4.0.1
 * Webpack 4
 * Babel 7
 * React Bootstrap

##Setup
In order to use this project you must first [create an API key with Google Maps](https://developers.google.com/maps/documentation/javascript/get-api-key).

After you have your key, create a root level `.env` file. Create an environment variable and assign it to your api key.
It should look something like `GOOGLE_API_KEY=__YOUR_API_KEY_HERE`. 

To run in development run: 
```
npm install
npm start 
```

##See the Project
The project is currently live [here](https://abrande.github.io/react-google-maps-app/).



