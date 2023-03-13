const express=require('express');
const router=express.Router();
const Story=require('../Models/story');
const User=require('../Models/UserSchema')

const {ensureAuth , ensureGuest} = require('../middleware/auth_middleware');
const { findByIdAndRemove } = require('../Models/UserSchema');

// Login/Landingn Page
// route GET/
router.get('/add',ensureAuth,async (req,res)=>{
    const stories=await Story.find({ user: req.user.id }).sort({createdAt:'desc'}).lean()
    const loggedUserId=req.user.id.toString()
    const prof=await User.find({_id:loggedUserId});
    const DP=prof[0].image;
    res.render('stories/addstories',
    {
        val:'YES',
        DP
    });
})


// show stories that are public
router.get('/',ensureAuth,async(req,res)=>{
    try{
        const stories=await Story.find({ user: req.user.id }).sort({createdAt:'desc'}).lean()
        const loggedUserId=req.user.id.toString()
        const prof=await User.find({_id:loggedUserId});
        const DP=prof[0].image;
        const Stories=await Story.find({ status: 'public' })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean()
        res.render('stories/index',{
        stories,
        Stories,
        DP,
        val:'YES'})
    }catch(err)
    {
        console.log(err);
    }
})

router.post('/',ensureAuth, async (req,res)=>{
    try{
        req.body.user=req.user.id;
        await Story.create(req.body)
        res.redirect('/dashboard')
    }catch(err){
        console.log(err);

    }
})

//GET to show/Read more 
// GET stories/show/id
router.get('/read/:id',ensureAuth, async (req,res)=>{
    try{
        console.log(req.params.id);
        const story=await Story.findById({ _id : req.params.id })
        .populate('user')
        .lean()
       if(!story){
        console.log("ERROR")
       }
       else{
        const loggedUserId=req.user.id.toString()
        const prof=await User.find({_id:loggedUserId});
        const DP=prof[0].image;
        res.render('stories/show',{
            story,
            val:"YES",
            DP
        })
       }
    }catch(err)
    {
        console.log(err);
    }
})

// show edit page
//GET /stories/edit/:id
router.get('/:id',ensureAuth,async(req,res)=>{
    // var storyId=req.params.id
    const loggedUserId=req.user.id.toString()
    const prof=await User.find({_id:loggedUserId});
    const DP=prof[0].image;
    console.log(req.params.id);
    const story=await Story.findOne({
        _id: req.params.id
    }).lean()
    if(!story)
    {
        console.log("error in edit page");
    }
    else{
        console.log("sagdja");
        res.render('stories/edit',
        {
            story
            ,val:"YES",
            DP
        })
    }
})


// PUT request
// route PUT /stories/id
router.put('/:id',ensureAuth,async (req,res)=>{

    var story= await Story.findById(req.params.id).lean()
    if(!story)
    {
        console.log("error hai ")   
    }
    else{

        story= await Story.findOneAndUpdate({ _id : req.params.id }, req.body ,{ new : true })
        console.log(story);
        // console.log("*************");
        res.redirect('/dashboard');
    }
})
// DELETE request
// route DELETE /stories/id
router.delete('/:id',ensureAuth,async (req,res)=>{
try{
    await Story.findByIdAndRemove({_id: req.params.id})
    // await Story.remove({_id:req.params.id})
    res.redirect('/dashboard')
}catch(err){
    console.log(err);
}
})


module.exports=router;