const express = require('express');
const router=express.Router();

const Person = require('../models/person');

//POST route to add person
router.post('/',async (req,res)=>{
    try{ 
      const data=req.body
      const newPerson = new Person(data);
      const response= await newPerson.save();
      console.log('data saved')
      res.status(200).json(response);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  
    }
    
  })

//Get route to get person
router.get('/',async(req,res)=>{
    try{
      const data= await Person.find();
      console.log('data fetched')
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  
    }
  })

  router.get('/:workType',async(req,res)=>{
    try{
      const workType = req.params.workType;
    if(workType== 'chef' || workType== 'manager' || workType=='waiter'){
      const response = await Person.find({work: workType});
      console.log('response Fetched');
      res.status(200).json(response);
    }else{
      res.status(404).json({error: 'invalid work Type'});
    }
    }catch(err){
      console.loog(err);
      res.status(500).json({error: 'Internal Server Error'});
  }
  })

router.put('/:id',async(req, res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData =req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true,
            runValidators: true,
        })
        if(! response){
            return res.status(404).json({error:'Person not Found'});
        }

        console.log('Data Updated !');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const personId =req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.sendStatus(404).json({error:'Person Not Found !'});
        }
        console.log('Data Delete');
        res.status(200).json({message: 'person Deleted Successfully'});

    }catch(err){
       console.log(err);
       res.status(500).json({error:'Internal Server Error'});
    }
})




//   const personRoutes = require('./routes/personRoutes');
//   application.use('/',personRoutes);

  module.exports= router;
