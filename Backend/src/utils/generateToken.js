import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign(
        {userId},process.env.JWT_SECRET,
        {
            expiresIn:"7d",
        }
    );
};

export default generateToken;

/*
WHY THIS?
After login: Google Token should not be sent on every request

Google Login Once
↓
Our JWT Created
↓
Use JWT Everywhere

*/