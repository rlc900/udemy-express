const fs = require('fs')
const express = require('express');

const app = express();

// app.get('/', (request, response) => {
//   response
//   .status(200)
//   .json(
//     {message: 'Hello from the server side!',
//     app: 'Natours'}
//   )
// })
//
// app.post('/', (request, response) => {
//   response.send('You can post to this URL!')
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (request, response) => {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours //variable tours
    }
  })
})

const port = 3000;
app.listen(port, () => {
  console.log(`App running on${port}`)
});
