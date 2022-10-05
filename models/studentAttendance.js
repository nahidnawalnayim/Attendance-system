const {Schema, model}=require('mongoose')

const studentattendanceSchema=Schema({
    createdAt:Date,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    adminAttendance:{
        type: Schema.Types.ObjectId,
        ref: 'AdminAttendance'
    }
})

const studentAttendane=model('StudentAttendane',studentattendanceSchema);
module.exports=studentAttendane;