const User=require('../models/user')

const findUser=()=>{
    return User.find()
}

const findUserByprop=(key, value) =>{
    if(key==='_id'){
        return User.findById(value);
    }
    return User.findOne({[key]:value})
}

const createUser=({name, email, password})=>{
 let user=new User({name, email, password})
 return user.save()
}
const updateUser=async(id,data)=>{
    const user= await findUserByprop('email',data.email)
    if(user){
        console.log('user already exists!!');
    }
    return User.findByIdAndUpdate(id,{...data},{new:true})
}
module.exports = {findUserByprop,createUser,findUser,updateUser}
