import express from 'express'
import api from './api/index.js';

const app = express();

// Web sivusto avautuu public-kansiosta (juuresta), ylin reitti avautuu
app.use(express.static('public'));

// tai aliosoitteesta
//app.use('/sivusto', express.static('public'));

// Lisää prefixin ja ohjaa kaikki api-routerin sisällä oleville reiteille
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1', api);


// Yksinkertainen middleware
app.get('/example/middleware',
  (req, res, next) => {
    console.log('Moi olen täällä 1');
    next(); // Seuraava funktio
},
(req, res, next) => {
    console.log('Olen middleware ja käsittelen dataa');
    next(); // Seuraava funktio
},
(req, res) => {
    console.log('Moikka, pääsin loppuun asti');
    res.send('Tiedosto upattu ja käsitelty'); // Lähettää clientille tekstin
}
);

export default app;
