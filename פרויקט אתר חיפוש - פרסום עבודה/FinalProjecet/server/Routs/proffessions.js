import https from 'https';
import fs from "fs";
import path from 'path';
import express from 'express';
const router = express();
import {GetProffessions} from '../Controllers/proffessions.js';

router.get('/', GetProffessions)//קבלת מקצועות

export default router;