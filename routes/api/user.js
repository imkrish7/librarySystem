const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');



// User model
const user = require('../../models/user');

router.get('/',(req,res)=>{
    res.send({"message": "Hello"})
})

router.post('/register',(req,res)=>{

    const { name, email, password } = req.body;

    if( !name || !email || !password){
        res.status(400).json({ msg: "Please enter all fields "});
    }

    user.findOne({ email })
        .then( users=> {
            if(users){
                return res.status(400).json({ msg: 'User already exists'});
            }

            const newUser = new User({
                name,
                email,
                password,
            })

            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err,hash)=>{
                    if(err) throw err;

                    newUser.password = hash;

                    newUser.save().then( user=> {

                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            (err,token)=>{
                                if(err) throw err;
                                
                                res.json({
                                    token,
                                    user:{
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                        }
                                });
                            }
                        )
                        
                    })
                })
            })
        })


    // res.send({ msg: "What the hell dude "});
})

module.exports = router;