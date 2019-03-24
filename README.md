# My-Booket

> My Book Pocket

![](https://i.imgur.com/KHcgo5O.png)

## About

My Booket means My Book Pocket. This service provides searching books and recording the books.

## Test Account

- Email: **test@test.com**
- Pw: **1234**

## Tech

### Frontend

- Vue
- Vue-router
- Vuex
- Vee-validate
- Vuetify
-

### Server

- Node.js
- Express
- MongoDB
- Jsonwebtoken

#### AWS

- EC2

## Installation

1. Clone the repository

   ```bash
   $ git clone https://github.com/cemujax/My-Booket.git
   ```

2. Build

   ```bash
   $ npm run build
   ```

3. Setting config file

   config/index.js

   ```javascript
   module.exports = {
     MONGO_URI:
       "mongodb+srv://[username:password]@cluster0-qv0pp.mongodb.net/cemujax", // MongoDB Atlas URI
     INTERPARK_KEY:
       "70AF249AFAD554EBC47AC080940F8264D5F4BE9E4B2C1F855B0FCF4633E3BB29" //  //인터파크도서 API 인증키
   };
   ```

4. Run the development server

   ```bash
   $ $ npm run start
   ```
