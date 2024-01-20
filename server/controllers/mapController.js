import mapModel from "../models/mapModel.js";


function getUserId(req) {
    const tokenValue = req.cookies.token;
    const tokenParts = tokenValue.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    return JSON.parse(rawPayload);
}

function sidebarLocationFactory(groups) {
    let html = `<ul id="sidebar"> Locations`;
    // console.log(groups)
    for (const group in groups) {
        // console.log(groups[group])
        html += `<ul> groupName`;
        for (const location in groups[group]) {
            const g = groups[group];
            const liElement = `<li class="locationItem" locationId="${g[location].id}" title="${g[location].locationTitle}" groupName="groupname"> ${g[location].locationTitle} <button type="button" hx-post="/removeLocation" hx-target="#sidebar" hx-swap="outerHTML"  hx-vars='{"locationId": "${location.id}", "title": "${location.locationTitle}", "groupName": "groupName"}'>DEL</button> </li>`;
            html += liElement;
        }
        html += `</ul>`;
    }
    html += `</ul>`;

    // console.log({html})
    return html;
}

const mapController = {
    loadMap: async (req, res) => {
        const userId = getUserId(req);
        const user = await mapModel.getUser(userId) || {};

        if (user) {
            res.render('map', {groups: user.groups});
        } else {
            console.log(`Could not find user.`)
        }

    },
    addLocation: async (req, res) => {
        const locationInfo = req.body;
        const userToken = getUserId(req);
        const response = await mapModel.addLocation(userToken.id, {locationInfo});
        return sidebarLocationFactory(response.groups);
    },
    removeLocation: async (req, res) => {
        const locationInfo = req.body;
        const userToken = getUserId(req);
        const response = await mapModel.removeLocation(userToken.id, {locationInfo});
        console.log(response.groups)
        return sidebarLocationFactory(response.groups);
    }
};

export default mapController;
