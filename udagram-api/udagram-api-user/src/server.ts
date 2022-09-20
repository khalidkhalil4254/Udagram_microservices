//common------------------------------------------
import {IndexRouter} from './controllers/v0/index.router';
import cors from 'cors';
import express from 'express';
import {sequelize} from './sequelize';
import bodyParser from 'body-parser';
import {config} from './config/config';
import {V0_USER_MODELS} from './controllers/v0/model.index';


(async () => {
  //in user microservice only---------------------
  await sequelize.addModels(V0_USER_MODELS);

  //common-----------------------------------------
  console.debug("Initialize database connection...");
  await sequelize.sync();

  //common-----------------------------------------
  const app = express();
  const port =  8080;

  //common-----------------------------------------
  app.use(bodyParser.json());

  // We set the CORS origin to * so that we don't need to
  // worry about the complexities of CORS this lesson. It's
  // something that will be covered in the next course.
  //common-----------------------------------------
  app.use(cors({
    allowedHeaders: [
      'Origin', '*',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    origin: '*',
  }));

  //entry point of services in monolith------------
  app.use('/api/v0/', IndexRouter);

  // Root URI call
  //common-----------------------------------------
  app.get( '/', async ( req, res ) => {
    res.send( '/api/v0/' );
  } );


  // Start the Server
  //common-----------------------------------------
  app.listen( port, () => {
    console.log( `server running ${config.url}` );
    console.log( `press CTRL+C to stop server` );
  } );
})();
