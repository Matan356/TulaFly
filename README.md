# TulaFly 

TulaFly Vacation app written in mern technologies - ReactJS nodeJS Express MongoDB using Socket.IO

The app allows the user to be impressed by the vacations on the site, register or log in, follow requested vacations, and receive the most affordable / cheapest price to add to the cart and purchase.
The admin has a dashboard where he sees graphs and tables on the vacation data and users, with the ability to add/delete/update vacations, and the user will receive the change in real-time.

# installation
It is necessary to download the existing libraries in the project to run.
Open the terminal in `TulaFly/back & TulaFly/front` folders and run (once in front, once in back)
``` npm i ``` 
# running
Open the terminal in `TulaFly/back & TulaFly/front` folders and run  command (once in front, once in back)
``` npm start ```

## set up 
~~ 
Fill in the file with your mongoDB login information & jwt key
``` back/nodemon.json ```
Fill in the file with your server url 
``` front/.env ```

# Technologies and libraries:

## Front: 

    "react": "^ 17.0.2" - react Library
    "react-dom": "^ 17.0.2" - react virtual DOM Library

    "react-image-file-resizer": "^ 0.4.7" - Resize images to handle image uploads

    "@ devexpress / dx-react-chart-material-ui": "^ 3.0.2" - For graphs displayed in admin

    "@ mui / icons-material": "^ 5.5.0"
    "@ mui / material": "^ 5.5.0" - Overall design of the app

## back:

    "bcryptjs": "^2.4.3" - For password security

    "body-parser": "^1.19.1" - To handle requests that arrive before they are processed

    "cors": "^2.8.5" - Restriction on resource use

    "express": "^4.17.2" - NodeJS server side framework

    "express-validator": "^6.14.0" - Validations that check the data received a request to serve

    "jsonwebtoken": "^8.5.1" - Provides a secure data transfer token.

    "mongoose": "^6.2.0" - Data Base

    "mongoose-unique-validator": "^3.0.0" - Validations on the Mongo schema

    "nodemon": "^2.0.15" - restarting the node application when file changes in the directory are detected.
    
# Video & demo
https://user-images.githubusercontent.com/79919211/167675562-c5b9baa6-b6c7-44f5-9e80-087559779d9f.mp4
https://tula-fly.herokuapp.com/

## License
[MIT](https://choosealicense.com/licenses/mit/)
