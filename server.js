const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const app = require('./app');


const database = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// returns a promise
mongoose.connect(database, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log('DB CONNECTION SUCCESSFUL'));


// creating schema/specify a schema for data
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name.'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price.']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});

// creating model
const Tour = mongoose.model('Tour', tourSchema);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`)
});
