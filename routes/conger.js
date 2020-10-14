var express = require('express');
var router = express.Router();
const CongerModel=require("../models/Conger")


// recup tout les conges 
router.get('/conger', function(req, res, next) {
  CongerModel.find().populate("id_user")
  .then(conger=>{
    res.json(conger);

  })
});
// ... quelle différence avec la route au dessus ?
// get conger by user id
router.get('/animateur/:id', async (req, res, next) => {

  const allCongers = await CongerModel.find().populate("id_user");
  // console.log(allCongers)
  
  const congers = allCongers.filter(conger => req.params.id == conger.id_user._id);
  // console.log(congers);
  res.json(congers);
  
});




router.patch('/conger/id_user/:id', async function(req, res, next) {// async cette fontction aet asyncrome elle va attendre 


  // CongerModel.findByIdAndUpdate(req.param.id, req.body) //il attend  de requperer le paramettre 
  // .then(conger=>{ //ensuite 

  //   res.json({congerdebut : conger.debut,congerfin:conger.fin });

  // })

  console.log("ID !!! >>> >>>>> !!! :  ",req.params.id)
  console.log("conger >>>>> !!! :  ",req.body)
  const conger = await CongerModel.findByIdAndUpdate(req.params.id, req.body) // Je recupere l'id de l'user qui a été mis dans l'url. Moongoose met à jour les donnée (grace à findByIdAndUpdate) qui viennent du formulaire (req.body) dans l'user 
  res.json(conger);
});

router.post('/send/:id_user', async function(req, res, next) {// async cette fontction aet asyncrome elle va attendre 

  // CongerModel.findByIdAndUpdate(req.param.id, req.body) //il attend  de requperer le paramettre 
  // .then(conger=>{ //ensuite

  //   res.json({congerdebut : conger.debut,congerfin:conger.fin });

  // })
  const conger = req.body;

  const congerPoster = await CongerModel.create({
    id_user : req.params.id_user,
    debut:conger.debut,
    fin:conger.fin,
  }) // Je recupere l'id de l'user qui a été mis dans l'url. Moongoose met à jour les donnée (grace à findByIdAndUpdate) qui viennent du formulaire (req.body) dans l'user 
  res.json({congerdebut : congerPoster.debut, congerfin:congerPoster.fin });
});


//envoyer

router.post('/conger', function(req, res, next) {
  // console.log(req.body)
  CongerModel.create(req.body)
  .then(conger=>{
    res.json(conger);
  })
});



//suprimer par id

router.delete("/conger:id", async (req, res, next) => {
  try {
    res.json(await CongerModel.findByIdAndDelete(req.params.id));
  } catch (err) {
    next(err);
  }

});




//recupe un conger par id 
router.get("/conger/:id", async (req, res, next) => {
  try {
    res.json(await CongerModel.findById(req.params.id));
 
  } catch (err) {
    next(err);
  }
});


 //modifier par id
router.patch("/:id", async (req, res, next) => {
  try {
    const congerUpdated = await CongerModel.findByIdAndUpdate(req.params.id,req.body, {new : true});
    res.json(congerUpdated);
    
    
  } catch (err) {
    next(err)
  }
});



module.exports = router;
