const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const {registerValidation,loginValidation} = require('./validation')

router.post('/register', async (req,res)=>{
    
    // validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(200).send({errorData: error.details[0].message});


    const numberExists = await User.findOne({userName: req.body.userName});
    if(numberExists){
        return res.status(200).send({errorData: "UserName already exists"})
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // New user creation
    const user = new User({
        userName: req.body.userName,
        password: hashPassword
    })

    try{
        const savedUser = await user.save();
        console.log(savedUser);
        const token = jwt.sign({_id: savedUser._id}, 'secretToken');
        res.send({id : savedUser._id, token: token});

    }catch(err){
        res.status(200).send({errorData: err});
    }
});

// LOGIN ROUTE

router.post("/login", async (req, res) => {
    // Validate the data before registering user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const { userName, password } = req.body;
  
    //check if user exists
    const userExists = await User.findOne({ userName });
    if (!userExists) return res.send("Email not found");
  
    //check if password is correct
    const passValid = await bcrypt.compare(password, userExists.password);
    if (!passValid) return res.status(400).send("Invalid Password");
  
    // JWT
    const token = await jwt.sign(
      { _id: userExists._id },
      'secretToken',
    );
    res.header("auth-token", token).send(token);
  
    //res.send("YOU ARE LOGGED IN SUCCESSFULLY");
  });

module.exports = router;