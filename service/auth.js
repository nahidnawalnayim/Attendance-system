const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken')
const {findUserByprop,createUser} = require('./user')

/**
 * passing {name ,email,password} to the user.js from controller auth.js. 
*/
const registerService=async ({name, email, password})=>{
    let user=await findUserByprop('email',email)
    if(user){
        throw Error('User is already exist!!')
    }
    const salt=await bcrypt.genSalt(10)
    const hash =await bcrypt.hash(password,salt)
    return createUser({name,email,password:hash})
}


/**
 * passing { email, password } to the user.js from controller auth.js. 
*/
const loginservice = async({email,password})=>{
    let user = await findUserByprop('email',email)
    if(!user){
        throw Error('user not found.')
    }
    /**
     * Comparing password from req.body with user.password in database
     */
    const ismatched=bcrypt.compare(password,user.password)
    if(!ismatched){
        throw Error('Invalid credentials!!')
    }
    const payload={
        // _id:user._id, 
        email:user.email,
        password:user.password,
        // accountStatus:user.accountStatus
    }
    return jwt.sign(payload,'secret-key',{expiresIn:'2h'})                        
}

module.exports={registerService,loginservice}