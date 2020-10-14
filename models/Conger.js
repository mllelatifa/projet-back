const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const congerSchema = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  mois: String,
  debut: Date,
  fin: Date,
  restant: {
    type: Number,
    default: 30
  },
  est_valider: {
    type: String,
    enum: ["en cours", "validé", "refuser"],
    default: "en cours",
  },
  jours: Number
});

const congerModel = mongoose.model("Conger", congerSchema);

module.exports = congerModel;