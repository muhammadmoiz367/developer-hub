const express=require('express');
const bcrypt=require('bcryptjs');
const gravatar=require('gravatar');
const jwt=require('jsonwebtoken');
const config=require('config');
const {validationResult, check} = require('express-validator');

const User=require('../../models/user')

const router=express.Router();

router.post('/', [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Please provide a valid email address').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const {name, email, password}=req.body;

    try {
        let user=await User.findOne({ email });
        if(user){
            return res.status(400).json({errors: [{ msg: 'User already registered with email' }] })
        }
        const avatar=gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        user=new User({
            name,
            email,
            password,
            avatar
        })

        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password, salt);

        await user.save()

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