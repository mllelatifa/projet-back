var express = require("express");
var router = express.Router();
const userModel = require("../models/Users");
const congerModel = require("../models/Conger");

const bcrypt = require("bcrypt");

/* GET home page. */
router.get("/", function (req, res, next) {
  userModel.find().then((conger) => {
    res.json(conger);
  });
});
router.get("/login", function (req, res, next) {
  userModel.find().then((conger) => {
    res.json(conger);
  });
});

router.post("/", async function (req, res, next) {
  const user = req.body;
  
  if (!user.name || !user.lastename || !user.motdepasse || !user.tel) {
    return res.status(422).json({
        msg: "Merci de remplir tous les champs requis.",
        level: "warning",
      });
  }
  else{
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(user.motdepasse, salt);
    user.motdepasse = hashed;
    try {
      await userModel.create(user);
      return res.status(200).json({
        msg: "signed up !",
        level: "success",
      });
    } catch (err) {
      next(err);
    }
  }

  
});

router.delete("/:id", async (req, res, next) => {
  try {
    // const allConger = await congerModel.find();
    // const filteredConger = allConger.filter(conger => conger.id_user == req.params.id);

    // filteredConger.forEach(conger => congerModel.findByIdAndDelete(conger._id))
    await userModel.findByIdAndDelete(req.params.id);
    res.json();
  } catch (err) {
    next(err);
  }
});
router.delete("/ligne", async (req, res, next) => {
  try {
    res.json(await userModel.findByIdAndDelete(req.params.id));
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    console.log("USER CONNECTED FINALLY", user);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
//  cree une route patch (modifier) l'user de l'id
router.patch("/updateUser/:id", async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      tel: req.body.tel,
    }

    if (req.body.motdepasse !== null){//si le mot de passe passe est nul il va pas s'executer
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(req.body.motdepasse, salt);
      user["motdepasse"] = hashed
    }

     const usermodifier=await userModel.findByIdAndUpdate(req.params.id, user,{new :true});

    //  req.body sont des donner envoyer par le front
    //  findByIdAndUpdate attent deux paremtre :  id  de la donner que nous recherchons ,
    //  et les donee qui vont etre inserer dans la doner qui a etait trouver par l id

    // {new :true}) permet la nouvelle  donner la nouvelle mise a jour ava,t l ancene

    res.json(usermodifier);
  } catch (err) {
    next(err);
  }
});

router.patch("/modiUsers/:id", async (req, res, next) => {
  //essayer de faire la function et si sa marche pas de le faire dans le cach  //
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, {
      email: req.body.email,
      tel: req.body.tel,
    });

    //  req.body sont des donner envoyer par le front
    //  findByIdAndUpdate attent deux paremtre :  id  de la donner que nous recherchons ,
    //  et les donee qui vont etre inserer dans la doner qui a etait trouver par l id

    // {new :true}) permet la nouvelle  donner la nouvelle mise a jour ava,t l ancene

    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.patch("/changeRestants/:id", async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
