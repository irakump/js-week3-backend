import express from 'express'
const hostname = '127.0.0.1';
const port = 3000;
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
app.get('/api/v1/cats/:id', (req, res) => {

  const cat = cats.find(cat => cat.cat_id === parseInt(req.params.id));

  if (cat) {
    res.json(cat);
    console.log('Cat id:', req.params.id);
    console.log(cat);
  } else {
    res.status.apply(404).json({
      "message": 'cat not found'
    });
  }
})

app.post('/api/v1/cats', (req, res) => {
  res.sendStatus(201);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
