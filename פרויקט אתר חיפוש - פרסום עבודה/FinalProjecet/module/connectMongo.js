// getting-started.js
import mongoose from 'mongoose';


//התחברות למסד נתונים
main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery',false);
  await mongoose.connect('mongodb://127.0.0.1:27017/PickAJobDB');
  console.log("connected to mongodb");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}