import https from 'https';
import fs from "fs";
import path from 'path';
import express from 'express';
const router = express();
import { GetWorker, GetMe, AddWorker, UpdateWorker } from '../Controllers/worker.js';

router.get('/:id', GetWorker);//קבלת עובד
router.put('/', UpdateWorker);//עדכון עובד
router.get('/', GetMe);//קבלת עובד
router.post('/', AddWorker);//הוספת עובד

export default router;