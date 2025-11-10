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


// API-polun juuri
app.get('/api/v1', (req, res) => {
  res.send('Welcome to my REST API');
})

app.post('/api/v1/cats', (req, res) => {
  // TODO: add posted cat to data
  res.sendStatus(201);
});

export default app;
