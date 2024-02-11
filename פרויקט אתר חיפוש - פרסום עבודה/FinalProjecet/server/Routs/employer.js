import https from 'https';
import fs from "fs";
import path from 'path';
import express from 'express';
const router = express();
import { GetEmployer, GetMe, AddEmployer, UpdateEmployer } from '../Controllers/employer.js';


router.get('/:id', GetEmployer);//קבלת מעסיק
router.get('/', GetMe)//קבלת מעסיק
router.post('/', AddEmployer);//הוספת מעסיק
router.put('/', UpdateEmployer);//עדכון מעסיק

export default router;