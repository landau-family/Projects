import https from 'https';
import fs from "fs";
import path from 'path';
import express from 'express';
const router = express();
import {CreateToken} from '../Controllers/login.js';

router.post("/",CreateToken );//קבלת מפתח זיהוי

export default router;
  