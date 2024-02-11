import https from 'https';
import fs from 'fs';
import path from 'path';
import jwt  from "jsonwebtoken";
import {employerModel} from '../../module/mongoSchemas.js'
import {workerModel} from '../../module/mongoSchemas.js'

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//יצירת מפתח זיהוי

async function CreateToken(req,res)
{
    
console.log("login");
    try {
        const {
          email,
          id
        } = req.body;
    
        // Validate user input
        if (!(email && id)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        let employer=await employerModel.findOne({"id":req.body.id,"email":req.body.email})
        let worker=await workerModel.findOne({"id":req.body.id,"email":req.body.email})
        if (employer||worker) {
            let user={"user":"","token":""};
            if(employer){
                user['user']=employer;
            }
            else{
                user['user']=worker;
            }
          const token = jwt.sign({
              id: user.user.id,
              
              email: user.user.email
            },
            "PickAJob", {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user['token']= token;
              console.log("making token");
          // user
          res.status(200).send(user).end();
        }else{
          res.status(400).send("Invalid Credentials");
        }
        
      } catch (err) {
        console.log(err);
      }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export {CreateToken};