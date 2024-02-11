import https from 'https';
import fs from 'fs';
import path from 'path';
import {employerModel,workerModel} from '../../module/mongoSchemas.js'
import {GetjobPostingById} from '../Controllers/jobPosting.js'

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//קבלת מעסיק

async function GetEmployer(req,res)
{
    let id=req.params.id;
    let employer={"employer":'','jobPosting':''};
    employer['employer']=await employerModel.findOne({'id':id});
    employer['jobPosting']=await GetjobPostingById(id);
    if(!(employer.employer)){
        res.status(400).end("incorrect credentials");
        return
    }
    res.send((employer));


}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//קבלת מעסיק על ידי שימוש בת"ז בשורת הניתוב

async function GetMe(req,res)
{
    req.params.id=req.user.id;
    GetEmployer(req,res)
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//הוספת מעסיק

async function AddEmployer(req,res)
{
    if(await employerModel.findOne({"id":req.body.id}))
    {
        res.status(400).end("id already in database");
        return
    }
    let new_Employer=new employerModel(req.body);    
    await new_Employer.save();//save
    res.send(new_Employer);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//עדכון מעסיק

async function UpdateEmployer(req,res)
{
    await employerModel.updateOne({"id":req.body.id},{$set:req.body});//update
    res.send(req.body);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export {GetEmployer, GetMe, AddEmployer, UpdateEmployer};