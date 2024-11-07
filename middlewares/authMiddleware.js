const jwt =  require('jsonwebtoken');
const { User } = require('../models'); // Adjust the path to your User model
const AppError = require('../utils/AppError'); // Custom error class, if any
const { use } = require('../routes/authRoutes');

module.exports = async (req, res, next) => {
    console.log(req);
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID in token payload
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};