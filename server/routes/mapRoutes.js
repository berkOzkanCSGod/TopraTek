import express, {response} from 'express';
import mapController from '../controllers/mapController.js';

const router = express.Router();

router.post('/location', (req, res) => {

    const body = req.body;
    console.log({body});

    mapController.addLocation(req, res).then((response) => {
        console.log(response)
    });
})

router.get('/', (req, res) => {
    res.render('map');
})

export default router;
