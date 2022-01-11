import 'reflect-metadata';
import './database';
import express from 'express';
import cors from 'cors'
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(process.env.PORT || 4000, () => console.log(`Server is started at http://localhost:${process.env.PORT || 4000}`));