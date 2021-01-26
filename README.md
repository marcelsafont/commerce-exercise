# Commerce API REST

This is an API Rest service for a shop that sells online courses. 

Before start, user must copy `config/config-example.js` and create a `config/config.js`. Is this file we are going to define port, database url, expiration time and secret seed for password encryption.   

## Manual local installation

User must have mongo running in the machine. 

### Install
    npm install


### Run app on dev mode
    npm run dev


### Run app on production mode
    npm start    

### Setting up development enviroment

`In order to use dummy content in the local enviroment, user must use 'secret' as seed in file config.js.`

In the root folder of the project there is a folder called `data`. Inside that folder there are dummy content exports jsons that can be imported.

    mongoimport --db=YOUR_DATABASE_NAME --collection=users --file=users.json
    mongoimport --db=YOUR_DATABASE_NAME --collection=categories --file=categories.json
    mongoimport --db=YOUR_DATABASE_NAME --collection=orders --file=orders.json
    mongoimport --db=YOUR_DATABASE_NAME --collection=products --file=products.json
    
There are 3 users created: 
- client: 
    - email: client@test.com 
    - name: client
    - password: client
- admin:
    - email: admin@test.com
    - name: admin
    - password: admin
- seller:
    - email: seller@test.com
    - name: seller
    - password: seller

## Docker installation  

Will be available in next releases

## Documentation

All endpoints are documented using swagger and they are located in `/api-docs`

### Open Endpoints

Open endpoints require no Authentication.
* login: `POST /login`
* singup: `POST /signup`
* products: `GET /products`
* products search: `GET /products/search`
* product info: `GET /product/:id`


### Endpoints that require Authentication


Closed endpoints require a valid Token to be included in the header of the request. A Token can be acquired from the Login view above.


### Current user related 

Each endpoint manipulates or displays information related to the User whose Token is provided with the request

* User orders: `GET /orders/user`

### Account related

Endpoints for viewing and manipulating the Accounts that the Authenticated User has permissions to access.

* User info (only admin): `GET /user/:id`
* All users (only admin): `GET /users`
* Delete user (only admin): `DELETE /user/:id`

### Considerations

Any delete method will NOT remove content from the database. We are using booleans fields instead. User has a 'status' field and product has an 'available' field. By default both are set to true.

This site has 3 user roles: `client, seller, admin`. 

Users by default are assigned to `client`. In order to change role client must use update endpoint. 
