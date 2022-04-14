require('dotenv').config();//instatiate environment variables

const CONFIG = {} //Make this global to use all over the application

CONFIG.port         = process.env.PORT  || '3000';

module.exports = CONFIG;
