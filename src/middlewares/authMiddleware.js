import jwt from 'jsonwebtoken';

export function validateToken(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        if (token) {
            req.user = jwt.verify(token, process.env.JWT_SECRET)
            next()
        } else {
            return res.status(403).json({message: "User not authorized"})
        }

    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "User not authorized"})
    }
}