const { max } = require('moment/moment');
const mongoose=require('mongoose');

const StorySchema=new mongoose.Schema({

        title: {
            type:String,
            required: true,
            trim:true
        },
        body: {
            type:String,
            required: true
        },
        status: {
            type:String,
            default:"public",
            enum:['public','private'],
            // uppercase:true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "User"
        },
        createdAt:{
            type:Date,
            default: Date.now(),
            maxLength:15
        }
})
module.exports=mongoose.model('Story',StorySchema)