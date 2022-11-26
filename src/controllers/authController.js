import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


class authController {
    async registration (req, res) {
        try {
            const { username, password } = req.body;
            const existUser = await User.findOne({
                username,
            });

            if(existUser){
                return res.status(400).json({
                    message: 'User with the same name already exists',
                });
            }

            const hashPassword = bcrypt.hashSync(password,5);

            const user = new User({
                username,
                password: hashPassword,
            });
            await user.save();
            return res.json({
                message: 'User successfully registered',
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Something went wrong while registering',
            });
        }
    };

    async login (req, res) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({
                username,
            });

            if(!user) {
                return res.status(400).json({
                    message: 'Username or password entered incorrectly',
                });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if(!validPassword){
                return res.status(400).json({
                    message: 'Username or password entered incorrectly',
                });
            }
            const token = generateAccessToken(user._id);
            return res.json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Something went wrong while logging in',
            });
        }
    }
}

    const generateAccessToken = (id) => {
        const payload = {
            id,
        }
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        })
    }

export default new authController()