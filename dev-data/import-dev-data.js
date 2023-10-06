const dotenv = require('dotenv');
dotenv.config({path:'./../config.env'});


const mongoose = require('mongoose');
const fs = require('fs');

const tourModel =require('./../models/tourModel');
const data =JSON.parse(fs.readFileSync('./tours-simple.json' ,'utf-8'));


const url =process.env.DATABASE_URL.replace('<password>' ,process.env.PASSWORD);

mongoose.connect(url).then(()=>console.log("connect to the database success"));

const deleteDB = async ()=>{
    try{
        await tourModel.deleteMany();
        console.log('Deleting Done');
    }
    catch(e){
        console.log(e.message);
    }
}


const populateDB =  async ()=>{
    try{
        await tourModel.create(data);
        console.log('Created Success');
    }
    catch(e){
        console.log(e.message);
    }
};

const connectAndPopulate = async () => {
    try {
      await deleteDB();
      await populateDB();
  
      mongoose.disconnect();
    } catch (e) {
      console.log(e.message);
    }
  };
  
  connectAndPopulate();