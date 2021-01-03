const express=require('express');
const {check, validationResult}=require('express-validator');
const request = require('request');
const config=require('config');
const router=express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const User = require('../../models/user');

//get logged in user profile
router.get('/me', auth, async (req, res)=>{
    try {
        const profile=await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({msg: 'No profile for this user'})
        }
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

//create profile for user
router.post('/', [ auth, [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills are required').not().isEmpty()
    ] ], 
    async (req, res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        }
        const {company, website, location, bio, status, skills, githubUsername, youtube, facebook, instagram, linkedin, twitter}=req.body;

        //create profile object
        const profileInfo={};
        profileInfo.user=req.user.id;
        if(company) profileInfo.company = company;
        if(website) profileInfo.website = website;
        if(location) profileInfo.location = location;
        if(bio) profileInfo.bio = bio;
        if(status) profileInfo.status = status;
        if(githubUsername) profileInfo.githubUsername = githubUsername;
        if(skills){
            profileInfo.skills=skills.split(',').map(skill=>skill.trim())
        }
        profileInfo.socialLinks={};
        if(youtube) profileInfo.socialLinks.youtube = youtube;
        if(facebook) profileInfo.socialLinks.facebook = facebook;
        if(twitter) profileInfo.socialLinks.twitter = twitter;
        if(instagram) profileInfo.socialLinks.instagram = instagram;
        if(linkedin) profileInfo.socialLinks.linkedin = linkedin;

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            if(profile){
                //update profile
                profile=await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileInfo},
                    {new: true}
                )
                return res.json(profile)
            }
            //create profile
            profile=new Profile(profileInfo);
            await profile.save();
            return res.json(profile)
        } catch (error) {
         console.error(error.message);
         res.status(500).send("Server error")
        }
})

//get all profiles
router.get('/', async (req, res)=>{
    try {
        const profiles=await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server running');
    }
})

//get profile by userID
router.get('/:userId', async (req, res)=>{
    try {
        const profile=await Profile.findOne({user: req.params.userId}).populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.json(profile)
    } catch (error) {
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//delete profile & user
router.delete('/', auth, async (req, res)=>{
    try {
        const user=await User.findOne({_id: req.user.id});
        if(user){
            await Profile.findOneAndDelete({user: req.user.id});
            await User.findOneAndDelete({ _id: req.user.id});
            return res.json({msg: 'Profile deleted'});
        }
        return res.status(400).json({msg: 'Profile not found'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//add experience to profile
router.put('/experience', [ auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
] ], 
async (req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const {company, title, location, from, to, current, description}=req.body;

    const experience={
        company, 
        title, 
        location, 
        from, 
        to, 
        current, 
        description
    };
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if(profile){
            profile.experience.unshift(experience);
            await profile.save();
            return res.json(profile)
        }
        return res.json({msg: 'No profile to add experience'})
    } catch (error) {
     console.error(error.message);
     res.status(500).send("Server error")
    }
})

//delete experience
router.delete('/experience/:expId', auth, async (req, res)=>{
    try {
        const user=await User.findOne({_id: req.user.id});
        if(user){
            const profile = await Profile.findOne({ user: req.user.id });
            const removeIndex=profile.experience.map(item=> item.id).indexOf(req.params.expId);
            if(removeIndex === -1){
                return res.status(404).json({msg: 'Experience not found'});    
            }
            profile.experience.splice(removeIndex, 1)
            await profile.save();
            return res.json({msg: 'Profile experience deleted'});
        }
        return res.status(400).json({msg: 'Profile not found'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//add education to profile
router.put('/education', [ auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
] ], 
async (req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const {school, degree, fieldOfStudy, from, to, current, description}=req.body;

    const education={
        school,
        degree,
        fieldOfStudy,
        from, 
        to, 
        current, 
        description
    };
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if(profile){
            profile.education.unshift(education);
            await profile.save();
            return res.json(profile)
        }
        return res.json({msg: 'No profile to add education'})
    } catch (error) {
     console.error(error.message);
     res.status(500).send("Server error")
    }
})

//delete education
router.delete('/education/:eduId', auth, async (req, res)=>{
    try {
        const user=await User.findOne({_id: req.user.id});
        if(user){
            const profile = await Profile.findOne({ user: req.user.id });
            const removeIndex=profile.education.map(item=> item.id).indexOf(req.params.eduId);
            if(removeIndex === -1){
                return res.status(404).json({msg: 'Education not found'});    
            }
            profile.education.splice(removeIndex, 1)
            await profile.save();
            return res.json({msg: 'Profile education deleted'});
        }
        return res.status(400).json({msg: 'Profile not found'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//get github repos
router.get('/github/:githubUsername', (req, res)=>{
    try {
        const options={
            uri: `https://api.github.com/users/${req.params.githubUsername}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientID')}&client_secret=${config.get('githubSecretKey')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}
        };
        request(options, (error, response, body)=>{
            if(error) console.error(error)
            if(response.statusCode !== 200){
                return res.status(404).json({msg: "No github profile found for user"});
            }
            res.json(JSON.parse(body))
        })
    } catch (error) {
        
    }
})

module.exports=router