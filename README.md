# A Million Thanks

## About
The goal of the project is to help A Million Thanks automate the process of recording the addresses of mail senders into a database. We will capture the address of the sender of received mail using the Google Cloud Vision optical character recognition API. We created a MySQL database that can hold all the addresses of the senders and support queries of address features including filtering by city, state, and zip code. Our project also features a heatmap of where mail is received from, a page to upload pictures, and a page to correct any invalid addresses that the character recognition API produced.

## Before running
1. Make sure you have a MySQL database hosted either in Google Cloud or a different service. In backend/app.js make sure you input your database information.  
![DBexample](/readmeimages/dbhost.png)

## Running the webapp
Go to both backend and frontend directories in separate terminals. Make sure all the dependencies are installed in both. To do this use the command: "npm install"

After that, call: "npm start" on the backend and then the frontend.

## Webapp snapshots
Home Page:
![home](/readmeimages/home.png)

Heatmap Page:
![heatmap](/readmeimages/heatmap.png)

Invalid Addresses Page:
![invalid](/readmeimages/invalid.jpg)

Upload Page:
![upload](/readmeimages/upload.png)

## APIs and Requirements
1. Google Cloud Vision - Requires google application credentials
2. Geocoding API - Requires API key
3. Google Maps API - Requires API key

## Design and Documentation
This can be found in the "[Get Jeffed] Design Document.pdf" file
