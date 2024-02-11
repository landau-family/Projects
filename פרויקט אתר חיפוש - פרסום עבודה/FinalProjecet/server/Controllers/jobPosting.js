import https from 'https';
import fs from 'fs';
import path from 'path';
import {jobPostingModel} from '../../module/mongoSchemas.js'


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//קבלת פרסומי עבודה למעסיק מסוים

async function GetjobPostingById(id)
{
    return await jobPostingModel.aggregate([{$match:{'employer':id}},{$sort:{'dateTime':-1}}]);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//קבלת כל הפרסומי עבודה

async function GetjobPosting()
{
    return await jobPostingModel.aggregate([{$sort:{'proffession':1}}]);
    
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//קבלת כל הפרסומי עבודה

async function GetjobPostings(req,res)
{
    var jobs=await jobPostingModel.aggregate([{$sort:{'proffession':1}}]);
    console.log(jobs);
    res.send(jobs);
    
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//הוספת פרסום עבודה

async function AddJobPosting(req,res)
{
    // let id=GetNextKey(req,res);
    // req.body.id=id;
    console.log(req.body);
    let new_jobPosting=new jobPostingModel(req.body);
    await new_jobPosting.save();//save
    let toSend=await jobPostingModel.findOne({'employer':new_jobPosting.employer,"dateTime":new_jobPosting.dateTime})
    res.send(toSend);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//עדכון פרסום עבודה

async function UpdateJobPosting(req,res)
{
    await jobPostingModel.updateOne({"dateTime":req.body.dateTime,"employer":req.body.employer},{$set:req.body});//update
    res.send("updated");
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//מחיקת פרסום עבודה

async function DeleteJobPosting(req,res)
{
    await jobPostingModel.deleteOne({"dateTime":req.body.dateTime,"employer":req.body.employer});
    let toSend=await GetjobPostingById(req.body.employer);
    res.send(toSend);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//החזרת המפתח הבא

async function GetNextKey(req,res)
{
    var jobs=await jobPostingModel.aggregate([{$sort:{'id':-1}}]);
    if(jobs[0] == undefined){
        console.log(1);
        res.send("1");
    }
    else{
    console.log(jobs);
    console.log(jobs[0].id);
    res.send(String(jobs[0].id+1));
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


export {GetjobPostings,GetjobPosting,AddJobPosting,UpdateJobPosting,DeleteJobPosting,GetjobPostingById,GetNextKey}