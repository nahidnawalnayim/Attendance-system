const {Schema, model} =require('mongooose')

const adminattendanceschema=Schema({
    timeLimit: Number,
    status: String,
    createdAt: Date
})
const AdminAttendance=model('AdminAttendance',adminattendanceschema)
module.exports=AdminAttendance;