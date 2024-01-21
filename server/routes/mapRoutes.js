import express, {response} from 'express';
import mapController from '../controllers/mapController.js';
import cookieAuthenticator from "../middleware/cookieAuthenticator.js";

const router = express.Router();

router.post('/addLocation', cookieAuthenticator.authenticateToken, async (req, res) => {
    const response = await mapController.addLocation(req, res);
    res.setHeader('Content-Type', 'text/html');
    return res.send(response);
})

router.post('/removeLocation', cookieAuthenticator.authenticateToken, async (req, res) => {
    const response = await mapController.removeLocation(req, res);
    res.setHeader('Content-Type', 'text/html');
    return res.send(response);
});

router.get('/expandGroup/:groupName', cookieAuthenticator.authenticateToken, async (req, res) => {
    const groups = await mapController.expandGroup(req, res);
    console.log({groups});
    return res.render('expandedGroup', { groups: groups });
});

router.get('/groups', cookieAuthenticator.authenticateToken, async (req, res) => {
    const groups = await mapController.getAllGroups(req, res);
    return res.render('groups', { groupKeys: Object.keys(groups), groupValues: Object.values(groups) });
})

router.get('/', cookieAuthenticator.authenticateToken, mapController.loadMap);

// router.get('/', cookieAuthenticator.authenticateToken, (req, res) => {
//     const groups = 0;
//     res.render('map', {groups: groups});
// })

export default router;
