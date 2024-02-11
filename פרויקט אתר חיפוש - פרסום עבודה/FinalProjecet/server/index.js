import express from 'express';
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import verifyToken from './middelware/outh.js';
import employer from './Routs/employer.js';
import worker from './Routs/worker.js';
import login from './Routs/login.js';
import proffessions from './Routs/proffessions.js';
import jobPosting from './Routs/jobPosting.js';
import area from './Routs/area.js';
import '../module/connectMongo.js';
import { GetjobPostings } from './Controllers/jobPosting.js';
import { AddEmployer } from './Controllers/employer.js';
import { AddWorker } from './Controllers/worker.js';
import { GetAreas } from './Controllers/area.js';
var corsOptions = {
  origin: "*"
};
const app = express();
const port = 3000;


app.use(cors(corsOptions));

//   // parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/images', express.static('images'));
app.get('/jobPosting',GetjobPostings);
app.post('/employer', AddEmployer);//הרשמות מעסיק למערכת
app.post('/worker', AddWorker);//הרשמות עובד למערכת
app.get('/area', GetAreas);//קבלת אזורים

app.use('/login', login);//התחברות

app.use(verifyToken);//בדיקת token

app.use('/employer', employer);//ניתוב למעסיק
app.use('/worker', worker);//ניתוב לעובד
app.use('/proffessions', proffessions);//ניתוב למקצועות
app.use('/jobPosting', jobPosting);//נותוב לפרסומי דרושים
app.use('/area', area);//ניתוב לאיזורים

app.listen(port, () => {
  console.log("server run");
});