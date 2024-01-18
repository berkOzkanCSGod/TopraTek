import mapModel from "../models/mapModel.js";


function getUserId(req) {
    const tokenValue = req.cookies.token;
    const tokenParts = tokenValue.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    return JSON.parse(rawPayload);
}


const mapController = {
    addLocation: async (req, res) => {
        const locationInfo = req.body;
        const userToken = getUserId(req);
        return await mapModel.addLocation(userToken.id, {locationInfo});
    }
};

export default mapController;
