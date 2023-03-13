const express=require('express');
const router=express.Router();
const Story=require('../Models/story');
const User=require('../Models/UserSchema')
const {ensureAuth , ensureGuest} = require('../middleware/auth_middleware')

// Login/Landingn Page
// route GET/
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
    });
})

router.get('/about',async (req,res)=>{
    const loggedUserId=req.user.id.toString()
        const prof=await User.find({_id:loggedUserId});
        const DP=prof[0].image;
    res.render('about',{
        val:"YES",
        DP
    });
})


// Dashboard
// route GET/
router.get('/dashboard', ensureAuth ,async (req,res)=>{
    try{
        const stories=await Story.find({ user: req.user.id }).sort({createdAt:'desc'}).lean()
        const loggedUserId=req.user.id.toString()
        //console.log(stories);
        const prof=await User.find({_id:loggedUserId});
        const DP=prof[0].image;
        console.log(DP);
        console.log("hfvjhaavcjvhascvjcvj");
        res.render('dashboard',{
            stories,
            loggedUserId,
            DP,
            val:'YES'
        })
    }catch(err){
        console.log(err);
    }
    console.log("hupp2");
})

module.exports=router;