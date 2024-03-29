import express from 'express';
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
    const group = await mapController.expandGroup(req, res);
    return res.render('expandedGroup', { groups: group });
});

router.get('/groups', cookieAuthenticator.authenticateToken, async (req, res) => {
    const groups = await mapController.getAllGroups(req, res);
    return res.render('groups', { groupKeys: Object.keys(groups), groupValues: Object.values(groups) });
})
router.post('/update', cookieAuthenticator.authenticateToken, async (req, res) => {
    const response = await mapController.updateLocation(req, res);
    res.redirect(req.get('Referer'))
})

router.get('/', cookieAuthenticator.authenticateToken, mapController.loadMap);
router.get('/settings', cookieAuthenticator.authenticateToken, async (req, res) => {
    return true;
});

router.get('/getGeoJson',  cookieAuthenticator.authenticateToken, async (req, res) => {
    return await mapController.getGeoJson(req, res);
})

router.post('/getLocationGeoJson',  cookieAuthenticator.authenticateToken, async (req, res) => {
    return await mapController.getLocationGeoJson(req, res);
})

export default router;
