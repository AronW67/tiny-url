import express from 'express';
import routes from './routes';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { configureDatabase } from './db/db.client';
dotenv.config();

// define port fron .env or fallback
const port = process.env.PORT || 3000; 

// start express app
const app = express();

// use cors library to handle CORS security
app.use(cors());

// use helmet library to add default security in request headers
app.use(helmet());

// enable parsing of json
app.use(express.json());

// configure routes
routes(app);

// configure database
configureDatabase();

// set app to listen on port
app.listen(port, () => {
    console.log(`Application listening on port: ${port}`)
});