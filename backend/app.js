//_______________________________________________________________________________________
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const listRoutes = require('./routes/recimet');

//_______________________________________________________________________________________

// setting
app.set('name', 'Server');
app.set('port', process.env.PORT || 3001);

// midelware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// --- midelware that serves the images ---
app.use(express.static('C:/Recimet/Fotos/CHEVROLET/'));
app.use(express.static('C:/Recimet/Fotos/FORD/'));
app.use(express.static('C:/Recimet/Fotos/TOYOTA/'));
app.use(express.static('C:/Recimet/Fotos/VOLKSWAGEN/'));

// ROUTES
app.use(listRoutes);

//server listening on port
app.listen(app.get('port'), () => {
  console.log(`${app.get('name')} listening on port ${app.get('port')}`);
});

module.exports = app;

//_______________________________________________________________________________________
