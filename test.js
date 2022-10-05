const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/testDB',{serverSelectionTimeoutMS:1000})
.then(()=>{
    console.log("DB connected");
    createUser({name: "nahid nawal",email: "smnibraz5@gmail.com"})
}).catch((e)=>{
    console.log("db not connected")
})
const schema=new mongoose.Schema({
    name: String,
    email: String
})
const User=mongoose.model('Model',schema)
const createUser=async (data)=>{
    const user=new User({...data})
    await user.save()
    return user;
}
