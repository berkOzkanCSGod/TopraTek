import express, {response} from 'express';
import authController from '../controllers/authController.js';
import cookieAuthenticator from "../middleware/cookieAuthenticator.js";

const router = express.Router();

router.get('/logout', authController.logout);

router.get('/login', authController.renderLogin);
router.post('/login', (req, res) => {
    authController.login(req, res).then((response) => {
        if (response) {
            res.send(response);
        }
    })
});

router.get('/signup', authController.renderSignup);
router.post('/signup', (req, res) => {
    authController.signup(req, res).then ((response) => {
        if (response) {
            res.send(response);
        }
    });
});

// router.get('/', cookieAuthenticator.authenticateToken, (req, res) => {
//     res.render('index')
// })

export default router;
