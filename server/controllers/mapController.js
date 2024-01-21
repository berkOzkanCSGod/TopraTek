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

    let i = 0
    for (const [group, groupName] of Object.entries(groups)) {
        html += `<ul> ${Object.keys(groups)[i]}`;
        html += `<button type="button" 
                        hx-get="/expandGroup" 
                        hx-trigger="click" 
                        hx-vars='{"groupName": "undefined"}'>
                    EXP
                </button>`;
        i++;
        for (const location in groups[group]) {
            const g = groups[group];
            // const liElement = `<li class="locationItem" locationId="${g[location].id}" title="${g[location].locationTitle}" groupName="${g[location].groupName}"> ${g[location].locationTitle} <button type="button" hx-post="/removeLocation" hx-target="#sidebar" hx-swap="outerHTML"  hx-vars='{"locationId": "${location.id}", "title": "${location.locationTitle}", "groupName": "${g[location].groupName}"}'>DEL</button> </li>`;
            const liElement = `
                  <li class="locationItem" locationId="${g[location].id}" title="${g[location].locationTitle}" groupName="${g[location].groupName}">
                      ${g[location].locationTitle}
                      <button type="button" hx-post="/removeLocation" hx-target="#sidebar" hx-swap="outerHTML"
                              hx-vars='{"locationId": "${g[location].id}", "title": "${g[location].locationTitle}", "groupName": "${g[location].groupName}"}'>
                        DEL
                      </button>
                  </li>`;

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
        return sidebarLocationFactory(response.groups);
    },
    expandGroup: async (req, res) => {
        const userToken = getUserId(req);
        return await mapModel.expandGroup(userToken.id, req.params.groupName)
    },
    getAllGroups: async (req, res) => {
        const userToken = getUserId(req);
        if (userToken) {
            return await mapModel.getAllGroups(userToken.id);
        }
        return false;
    }
};

export default mapController;
