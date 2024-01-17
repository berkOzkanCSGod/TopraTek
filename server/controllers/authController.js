import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authModel from "../models/authModel.js";

const AuthController = {
    renderLogin: async (req, res) => {
        res.render('login')
    },
    renderSignup: async (req, res) => {
        res.render('signup')
    },
    login: async (req, res) => {
        const {username, password} = req.body;
        console.log({username, password});
        const user = await authModel.login(username, password);

        if (user) {
            if(await bcrypt.compare(password, user.password)){
                const token = jwt.sign(user,"hi",{expiresIn: 3600})

                    res.cookie("token", token, {
                        httpOnly: true
                    })

                    res.redirect('/');
            } else {
                console.log("Incorrect password");
                return "Incorrect password"
            }
        } else {
            console.log(`Could not find user: ${username}`);
            return `Could not find user: ${username}`
        }
    },
    signup: async (req, res) => {
        const {username, email, password, confirmPassword} = req.body;
        if (password !== confirmPassword) {
            console.log("Passwords do not match, could not create an account");
            return {success: false, message: "Passwords do not match, could not create an account"};
        }

        if (await authModel.userExists(username)){
            console.log(`Username: ${username} is already taken, could not create an account.`);
            return {success: false, message: `Username: ${username} is already taken, could not create an account.`};
        }

        const hashedPassword = await bcrypt.hash(password, 13);

        const signupAction = await authModel.signup(username, email, hashedPassword)
        if (!signupAction) {
            return {success: false, message: "Could not perform signing up action. Internal server error"}
        }

        res.redirect('/')
    },
    logout: async (req, res) => {
        res.clearCookie('token');
        res.redirect('/');
    }
};

export default AuthController;
