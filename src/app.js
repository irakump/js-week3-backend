import express from 'express'
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to my REST API');
})

app.get('/api/test', (request, response) => {
  const responseData = {vastaus: "toimii"};
  response.json(responseData);
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
