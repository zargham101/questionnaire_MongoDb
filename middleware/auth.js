const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            throw new Error('Authorization header is missing');
        }

        if (!authHeader.startsWith('Bearer ')) {
            throw new Error('Token format is incorrect');
        }

        const token = authHeader.replace('Bearer ', '').trim();
        console.log("Token:", token);

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("Decoded token:", decoded);

        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        console.log("Authenticated user:", req.user);

        next();
    } catch (e) {
        console.error("Authentication Error:", e.message);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;
