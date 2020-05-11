const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const jsonParser = bodyParser.json();
const mongoose = require( 'mongoose' );
const { DATABASE_URL, PORT } = require( './config' );
const Sports = require('./models/sport-model')

const app = express();

function errorMessageResponse(message, status, res) {
  res.statusMessage = message;
  return res.status(status).end();
}

app.post('/sports/addSport/:sportId', jsonParser, async ({ body, params }, res) => {
  const fields = ['name', 'num_players', 'id'];

  for(let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if(!body[field]) {
      return errorMessageResponse(`${field} is missing in body`, 406, res);
    }
  }

  const { sportId } = params;
  if(sportId != body.id) {
    return errorMessageResponse('Id sent as param and as body does not match', 409, res);
  }

  try {
    const newSport = await Sports.createSport(body);
    return res.status(201).json(newSport);
  } catch (err) {
    console.log(err);
    return errorMessageResponse(err, 500, res);
  }

});

app.listen( PORT, () => {
  console.log( "This server is running on port 8080" );
  new Promise( ( resolve, reject ) => {
    const settings = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    };
    mongoose.connect( DATABASE_URL, settings, ( err ) => {
      if( err ){
        return reject( err );
      }
      else{
        console.log( "Database connected successfully." );
        return resolve();
      }
    })
  })
    .catch( err => {
      console.log( err );
    });
});
