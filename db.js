const mongoose = require('mongoose');

function connectdb(connectionString){
    mongoose.connect(connectionString).then(()=>{
        console.log("db connection established");
    }).catch((e)=>{
        console.log(e);
    })
}
module.exports = connectdb;