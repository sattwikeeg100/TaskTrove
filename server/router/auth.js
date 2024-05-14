const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');

require('../db/conn');
const User = require("../model/userSchema");



// using async-await
router.post('/register',async (req,res) => {
    const { name, email, phone, work, password, cpassword} = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword ) {
        return res.status(422).json({error: "Plz fill the field properly."});
    }

    try{
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" });
        }else if (password != cpassword){
            return res.status(422).json({ error: "Password doesn't match." });
        } else {
            //const user = new User({name: name, email: email, phone, work, password, cpassword});
            const user = new User({name, email, phone, work, password, cpassword});

            // yaha pe 'pre' method call hote hai
            await user.save();

            res.status(201).json({message: "user registered successfully"});
        }

    }
    catch(err){
        console.log(err);
    }
    
});

router.post('/login', async (req,res) => {
    /* console.log(req.body);
    res.json({message:"awesome"}); */

    // destructuring the data
    try{
        let token;
        const { email, password } = req.body;

        if (!email || !password){
            return res.status(400).json({error:"Please fill the credentials."});
        }

        const userLogin = await User.findOne({ email: email });
        //console.log(userLogin);

        if (userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            // don't do here:- const token = await userLogin.generateAuthToken();
            token = await userLogin.generateAuthToken(); // we could have used jwt here directly, but it would have made the program long.
            console.log(token);

            res.cookie("jwttoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({message:"Invalid Credentials"});
            }
            else {
                res.json({message:"User Signed In Successfully"});
            }
        } else {
            res.status(400).json({message:"Invalid Credentials"});
        }
        

        

    } catch(err){
        console.log(err);
    }
});

// about us ka page
router.get('/profile', authenticate, (req,res) => {
    console.log(`Hello this is my profile`);
    res.send(req.rootUser);
});

// get user data for contact us and home page
router.get('/getdata', authenticate, (req,res) => {
    console.log(`Hello this is my userdata`);
    res.send(req.rootUser);
})

// contact us page message send
router.post('/contactus', authenticate, async (req, res) => {
    try{
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            console.log("Error in Contact Form.");
            return res.json({ error: "Please fill the contact form properly."});
        }

        const userContact = await User.findOne({ _id: req.userID }); // Checking whether user exist or not

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, message);

            await userContact.save();
            res.status(201).json({message: "User Contact Successfully"});
        }
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/logout', (req, res) => {
    console.log(`Hello my logout page.`);
    res.clearCookie('jwttoken', {path:'/'});
    res.status(200).send('User logout');
});


module.exports = router;
