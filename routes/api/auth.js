const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require('../../routes/middleware/auth');
// User model
// const user = require("../../models/user");

router.get("/", (req, res) => {
  res.send({ message: "Hello" });
});

router.post("/", (req, res) => {
  const {email, password } = req.body;

  if ( !email || !password) {
    res.status(400).json({ msg: "Please enter all fields " });
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exists" });
    }

    bcrypt.compare(password, user.password)
          .then( isMatch=> {
              if(!isMatch) return res.status(400).json({msg: "Invalid credentials"})

              jwt.sign(
                  { id: user.id},
                  config.get('jwtSecret'),
                  (err,token)=>{
                    if(err) throw err;  
                    return res.json({
                        token,
                        user:{
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    })
                  }
              )
          })
  });
});


router.get('/user',auth,(req,res)=>{
  User.findById(req.user.id).select('-password')
       .then(user=> {
         return res.json(user)
        });
})

module.exports = router;
