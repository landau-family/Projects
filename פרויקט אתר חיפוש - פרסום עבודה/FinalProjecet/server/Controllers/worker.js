import https from 'https';
import fs from 'fs';
import path from 'path';
import {workerModel,employerModel} from '../../module/mongoSchemas.js'
import {GetjobPosting} from '../Controllers/jobPosting.js'

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//קבלת עובד

async function GetWorker(req,res)
{
    let id=req.params.id;
    let worker={'worker':'','jobPosting':''};
    worker['worker']=await workerModel.findOne({'id':id})
    worker['jobPosting']=await GetjobPosting()
    if(!(worker.worker)){
        res.status(400).end("incorrect credentials");
        return;
    }
    res.send(worker)


}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//קבלת עובד על ידי ת"ז בשורת הניתוב

async function GetMe(req,res)
{
    req.params.id=req.user.id;
    GetWorker(req,res)
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//הוספת עובד

async function AddWorker(req,res)
{
    // let employer=await employerModel.findOne({"id":req.body.id})
    let worker=await workerModel.findOne({"id":req.body.id})
    if(worker)
    {
        res.status(400).end("id already in database");
       return
    }
    
    let new_Worker=new workerModel(req.body);
    await new_Worker.save();//save
    res.send(new_Worker);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//עדכון עובד

async function UpdateWorker(req,res)
{
    await workerModel.updateOne({"id":req.user.id},{$set:req.body});//update
    let w= await workerModel.findOne({"id":req.user.id});
    res.send(w);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export {GetMe,GetWorker,AddWorker,UpdateWorker};