 const mongoose = require("mongoose");

 const BookSchema = new mongoose.Schema({
   title: { type: String, required: true, minlength: 3 },
   author: { type: String, required: true, minlength: 3 },
   year: { type: Number, required: true, max: new Date().getFullYear() },
   summary: { type: String, maxlength: 500 },
 });

 module.exports = mongoose.model("Book", BookSchema);

