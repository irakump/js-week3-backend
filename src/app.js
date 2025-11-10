import express from 'express'
import api from './api/index.js';

const app = express();

// Mock-data
const cats = [{
  cat_id: 3,
  name: 'Kissa',
  birthdate: '2023-11-04',
  weight: 6,
  owner: 'Pekka',
  image: 'https://loremflickr.com/320/240/cat',
},
{
  cat_id: 2,
  name: 'Katti',
  birthdate: '2024-01-14',
  weight: 4,
  owner: 'Pekka',
  image: 'https://loremflickr.com/320/240/cat',
},
{
  cat_id: 1,
  name: 'Miu',
  birthdate: '2023-09-02',
  weight: 5,
  owner: 'Seppo',
  image: 'https://loremflickr.com/320/240/cat',
},
];

// Web sivusto avautuu public-kansiosta (juuresta)

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
