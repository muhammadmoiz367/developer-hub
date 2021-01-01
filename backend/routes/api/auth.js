const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const {validationResult, check} = require('express-validator');
const router=express.Router();

const auth=require('../../middleware/auth');
const User=require('../../models/user')

router.get('/', auth, async (req, res)=>{
    try {
        const user=await User.findById(req.user.id).select("-password");
        res.json({user})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})

router.post('/', [
    check('email', 'Please provide a valid email address').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const {email, password}=req.body;

    try {
        let user=await User.findOne({ email });
        if(!user){
            return res.status(400).json({errors: [{ msg: 'Invalid credentials. Try again' }] })
        }
        
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors: [{ msg: 'Invalid credentials. Try again' }] })
        }

        const payload={
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtScretKey'), {expiresIn: 36000}, (error, token)=>{
            if (error)
                throw error
            res.json({token})
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})

module.exports=router