import express, {response} from 'express';
import mapController from '../controllers/mapController.js';
import cookieAuthenticator from "../middleware/cookieAuthenticator.js";

const router = express.Router();

router.post('/location', cookieAuthenticator.authenticateToken, async (req, res) => {
    const response = await mapController.addLocation(req, res);
    res.setHeader('Content-Type', 'text/html');
    return res.send(response);
})

router.post('/removeLocation', cookieAuthenticator.authenticateToken, async (req, res) => {
    const response = await mapController.removeLocation(req, res);
    res.setHeader('Content-Type', 'text/html');
    return res.send(response);
});

router.get('/', cookieAuthenticator.authenticateToken, mapController.loadMap);

// router.get('/', cookieAuthenticator.authenticateToken, (req, res) => {
//     const groups = 0;
//     res.render('map', {groups: groups});
// })

export default router;
