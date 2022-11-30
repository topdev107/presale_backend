let jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.header["x-access-token"];

    if(!token) {
        return res.status(403).json({"status": "error", "message": "A token is required for authentication."});        
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(201).json({"status": "error", "message": err});
    }

    next();
}

module.exports = verifyToken;