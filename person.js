const mongoose = require("mongoose");
mongoose
    .connect("mongodb://127.0.0.1:27017/shopApp")
    .then(() => {
        console.log("connection open");
    })
    .catch((err) => {
        console.log("Connection error", err);
    });
    const personSchema= new mongoose.Schema({
        first:String,
        last: String
    })
    personSchema.virtual('fullName').get(function(){/* we can define a setter or a getter, so when I get full name, when I call dot full name. I want to retrieve some value that is first and last name combined with a space between   */
return `${this.first} ${this.last}`
    }) 
    const Person= mongoose.model('Person',personSchema)