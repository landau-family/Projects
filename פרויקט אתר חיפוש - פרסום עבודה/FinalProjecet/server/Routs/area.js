import https from 'https';
import fs from "fs";
import path from 'path';
import express from 'express';
const router = express();
import {GetAreas} from '../Controllers/area.js';


router.get('/', GetAreas);//ניתוב לקבלת אזורים


export default router;