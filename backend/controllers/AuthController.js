const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { message } = require('prompt');

const  registerUser = async (req,res) => {
   
    const {username, email, password} = req.body
    console.log("username is: ",username)
    console.log("email is: ",email)
    console.log("password is: ",password)

    try {
        if(!username || !email || !password){
            res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        
        const userExist = await User.findOne({email});

        if(userExist){
            res.status(400).json({
                success:false,
                message:"User already exist"
            })
        }

        //Password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        
        //New user
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const user = await newUser.save();

        //Generate token
        const token = jwt.sign(
            {id: user._id, email: user.email}, 
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )
        console.log("token is: ",token)
        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
}

const loginUser = async (req,res) => {
    const {email, password} = req.body;
    console.log("email is: ",email);
    console.log("password is: ",password);

    try {
        const checkUser = await User.findOne({email});
        console.log("user is: ",checkUser)
        if(!checkUser){
            return res.status(401).json({
                success: false,
                message: "user does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, checkUser.password);
        console.log("isMatch is: ",isMatch);

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        } 

        const token = jwt.sign(
            {id: checkUser._id, email: checkUser.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        res.status(200).json({
            success: true,
            message: "Login successfully",
            token:token
        })
        
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }

    
}

module.exports = {registerUser, loginUser}
