import mongoose from 'mongoose'

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//סכמות למסד נתונים

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//מעסיק
const employerSchema=new mongoose.Schema({
    id:String,
    email:String,
    name:String,
    area:String
});
const employerModel=new mongoose.model('employers',employerSchema);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//פרסום עבודה
const jobPostingSchema=new mongoose.Schema({
    id:Number,
    dateTime:Date,
    employer:String,
    area:String,
    proffession:String,
    desc:String
});
const jobPostingModel=new mongoose.model('jobPostings',jobPostingSchema);


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//עובד
const workerSchema=new mongoose.Schema({
    id:String,
    email:String,
    name:String,
    like:[jobPostingSchema]
});
const workerModel=new mongoose.model('workers',workerSchema);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//מקצוע
const proffessionsSchema=new mongoose.Schema({
    name:String
});
const proffessionsModel=new mongoose.model('proffessions',proffessionsSchema);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//אזור
const areaSchema=new mongoose.Schema({
    name:String
});
const areaModel=new mongoose.model('areas',areaSchema);


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//שיתוף הסכמות
export {employerModel,workerModel,proffessionsModel,areaModel,jobPostingModel};