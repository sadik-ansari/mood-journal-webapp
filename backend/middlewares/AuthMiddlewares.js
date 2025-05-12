const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req,res,next) => {

const token = req.header("Authorization")?.split(" ")[1];

    if(!token){
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decode  = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next()
    } catch (error) {
        console.error("JWT verification failed:", error);
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = authMiddleware;