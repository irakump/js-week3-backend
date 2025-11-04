import express from 'express'
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

// mock-data
const cats = [{
  cat_id: 1,
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
];



// Web sivusto avautuu public-kansiosta (juuresta)
app.use(express.static('public'));
// tai aliosoitteesta
app.use('/sivusto', express.static('public'));

// API-polun juuri
app.get('/api/v1', (req, res) => {
  res.send('Welcome to my REST API');
})

// Cat-endpoints
app.get('/api/v1/cats', (req, res) => {
  //res.send('Cat API');
  res.json(cats);
})

// One cat
app.get('/api/v1/cats/', (req, res) => {
  //res.send('Cat API');
  res.json(cats);
})


app.get('/api/test', (request, response) => {
  const responseData = {vastaus: "toimii"};
  response.json(responseData);
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
