var express = require('express');
var router = express.Router(); 
const userModel=require("../models/Users");

const bcrypt=require('bcrypt');





router.post('/login', function(req, res, next) {
  console.log(req.body)
    userModel.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        console.log("error1")
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        
      }
      bcrypt.compare(req.body.motdepasse, user.motdepasse)
        .then(valid => {
          if (!valid) {
            console.log("error2")
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
             user
         
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  });



// router.post("/login", async (req, res, next) => {

//   // req.body sont les donnée reçu par le axios (qui viennent donc du formulaire)
//   const userInfos = req.body; //nous donnons les données de req.body à une nouvelle const userInfos

//   // ici nous verifions si les données email et password ne sont pas vide (qui ont bien été renseigné dans les champs du formulaire)
//   if (!userInfos.email || !userInfos.motdepasse) {// si elles ne sont pas renseigné, on rentre dans la condition et nous retournons une erreur

//     console.log("ERRROR 1 !!!!!!")
//     res.status(401).json({
//       msg: "Identifiants incorrects",
//       level: "error",
//     });
//   }
//   // si ils sont renseigné, nous rentrons pas dans la conditionjuste en haut et le code continue ...

//   UserModel
//     .findOne({ email: userInfos.email }) // Nous demandons à mongoose d'aller chercher parmis tous les users, si l'un deux à l'email que nous mettons dans le parametre emial
//     .then((user) => { // ensuite le resultat du findOne retourne soit l'user qui nous intéresse soit null si l'user n'a pas été trouvé
//       if (!user) { // donc si l'email ne correspond à aucun utilisateur de la base, nous rentrons dans le if qui retourne une erreur
//         return res.status(401).json({
//           msg: "Identifiants incorrects",
//           level: "error",
//         });
//       }
//       // sinon, nous rentrons pas dans la condition juste en haut et le code continue ...
      
//       // On créer une const checkpassword qui à la fin vaudra soit true soit false.
//       const checkPassword = bcrypt.compareSync( //La fonction compareSync de bcrypt retourn un boolean.
//           // on compare le password crypté de l'userInfos (celui qui vient du form) avec celui de la base de donnée (qui a été récuperé ligne 25 avec le findOne)
//         userInfos.motdepasse,
//         user.motdepasse
//       );
     
//       if (checkPassword === false) { // vue que checkPassword vaut soit true si le mot de passe est le bon, soit false si le mot de passe est faut, nous vérifions dans le if sa valeur
//         // si le mdp est faux on rentre dans le if qui retourne une erreur.
//         return res.status(401).json({
//           msg: "Identifiants incorrects",
//           level: "error",
//         });
//       }
//        // sinon, nous rentrons pas dans la condition juste en haut et le code continue ...
//        //et ici on retourne juste le user en json
//       res.json(user)
//     })
//     .catch(next);
// });














module.exports = router;