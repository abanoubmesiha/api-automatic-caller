import express from 'express';
import 'dotenv/config';
import {dataGathering} from './data-gathering/index.js';

const app = express();
const port = 3456;

app.listen(port, () => {
  console.log(`App listening on port ${port}`)

  dataGathering();
});
