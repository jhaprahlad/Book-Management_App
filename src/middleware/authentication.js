const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = require('../../config');

const authentication = (req, res, next) => {
    try {
        const token = req.header("x-api-key");
        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }
        const decoded = jwt.verify(token,"Prahlad_Secret_key");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

module.exports = {
    authentication,
};
