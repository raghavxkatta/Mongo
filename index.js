const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
.then(()=>{
console.log("connection open");
})
.catch((err)=>{
    console.log("Connection error",err);
})
const movieSchema= new mongoose.Schema({
    title:String,
    year:Number,
    score:Number,
    rating:String
});

const movie= mongoose.model('movie',movieSchema);

const amadeus = new movie({title:'amadeus', year:1985, score:9.2, rating:'A'});

movie.insertMany([
    {title:'Ghajni',year:1957,score:9.2,rating:'A'},
    {title:'Puppet',year:2007,score:4.7,rating:'Pg-13'},
    {title:'Jugni',year:2006,score:9.2,rating:'R'}
])
.then(data=>{
console.log("It worked")
console.log(data)
})
.catch(err=>{
    console.log("error entered",err)
})

