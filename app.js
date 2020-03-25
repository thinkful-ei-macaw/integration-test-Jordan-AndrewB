const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const google = require('./google-data.js');

app.get('/apps', (req, res) => {
  const {sort, genres} = req.query;
  let googleArray = [...google];

  if(sort) {
    if(sort === 'Rating') {
      googleArray.sort((a, b) => {
        return a['Rating'] > b['Rating'] ? 1 : a['Rating'] < b['Rating'] ? -1 : 0;
      })
    } else if(sort === 'App') {
      googleArray.sort((a,b) => {
        return a['App'] > b['App'] ? 1 : a['App'] < b['App'] ? -1 : 0;
      })
    } else {
      res
        .status(400)
        .send('You must select rating or app');

    }
  } 

  if(genres) {
    const genre = [ 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']

    if(!genre.includes(genres)) {
      res.status(400).send('Genre not included, please pick another');
    } else {
          
      googleArray = googleArray.filter( item => {
        return item['Genres'].includes(genres); 
      });
    }
  }
  
  
  
  
  res.json(googleArray);
});
  
module.exports = app;