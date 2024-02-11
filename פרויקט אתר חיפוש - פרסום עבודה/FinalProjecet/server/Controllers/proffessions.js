import https from 'https';
import fs from 'fs';
import path from 'path';
import {proffessionsModel} from '../../module/mongoSchemas.js'

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//קבלת כל המקצועות

async function GetProffessions(req,res)
{
    console.log(await proffessionsModel.find({}))
    res.send(await proffessionsModel.find({}));
    
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export {GetProffessions};
