import express, {response} from 'express';
import mapController from '../controllers/mapController.js';
import cookieAuthenticator from "../middleware/cookieAuthenticator.js";

const router = express.Router();

router.post('/location', cookieAuthenticator.authenticateToken, async (req, res) => {
    const response = await mapController.addLocation(req, res);
    return res.status(200).json({message: response.message});
})

router.get('/', cookieAuthenticator.authenticateToken, (req, res) => {
    res.render('map');
})

export default router;
