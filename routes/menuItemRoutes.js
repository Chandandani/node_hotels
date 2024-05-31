const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');



router.post('/',async (req,res)=>{
    try{ 
      const data=req.body
      const newMenu = new MenuItem(data);
      const response= await newMenu.save();
      console.log('data saved')
      res.status(200).json(response);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  
    }
    
  })
  
  router.get('/',async(req,res)=>{
    try{
      const data= await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
  
    }
  })


router.put('/:id',async(req, res)=>{
    try{
        const menuId = req.params.id;
        const updatedPersonData =req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId,updatedPersonData,{
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
        const menuId =req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.sendStatus(404).json({error:'Item Not Found !'});
        }
        console.log('Data Delete');
        res.status(200).json({message: 'Item Deleted Successfully'});

    }catch(err){
       console.log(err);
       res.status(500).json({error:'Internal Server Error'});
    }
})



  

  
  module.exports= router;