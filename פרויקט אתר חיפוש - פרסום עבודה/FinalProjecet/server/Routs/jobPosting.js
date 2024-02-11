import https from 'https';
import fs from "fs";
import path from 'path';
import express from 'express';
const router = express();
import {AddJobPosting,UpdateJobPosting,DeleteJobPosting,GetjobPostings,GetNextKey} from '../Controllers/jobPosting.js';

router.get('/',GetjobPostings);
router.post('/',AddJobPosting);//הוספת פרסום עבודה
router.put('/', UpdateJobPosting);//עדכון פרסום עבודה
router.delete('/',DeleteJobPosting);//מחיקת פרסום עבודה
router.get('/key/',GetNextKey);
export default router;