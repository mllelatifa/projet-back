const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidador = require("mongoose-unique-validator");
//on le rajoute comme plugin à  notre schema
// un schema c'est un plan qui va permettre de générer le modèle
// le schéma contient les règles de structure des documents (objets)...
// ... que l'on souhaite insérer en base de données !

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastename: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }, //pour pas s'incrire avec la meme adresse mail
  motdepasse: {
    type: String,
    required: true
  },
  tel: {
    type: Number,
    required: true
  },
  datedenaissance: {
    type: String,
    required: true
  },

  
  role: {
    type: String,
    enum: ["directeur", "animateur", ],
    default: "animateur",
  },
  restants: {
    type: Number,
    default: 30
  }
});

//Dans notre schéma, la valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in, s'assurera qu'aucun des deux utilisateurs ne peut partager la même adresse e-mail.
//on va l appliquer au schema avant d en faire un model plugin c'est une methode
userSchema.plugin(uniqueValidador);


// on utlise le schéma défini ci-dessus pour générer un Model pour la collection Product
// les Models sont un type d'objet qui nous permet d'intéragir avec la collection product

const usersModel = mongoose.model("Users", userSchema);

// le model sera utilisé en dehors de ce fichier, il nous faut donc l'exporter !
module.exports = usersModel;