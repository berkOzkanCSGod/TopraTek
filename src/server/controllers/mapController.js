import mapModel from "../models/mapModel.js";

function getUserId(req) {
    const tokenValue = req.cookies.token;
    const tokenParts = tokenValue.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    return JSON.parse(rawPayload);
}

function sidebarLocationFactory(groups) {
    let html = `<ul id="sidebar">`;

    let i = 0
    for (const [groupName, group] of Object.entries(groups)) {
        const groupTitle = Object.keys(groups)[i] === 'no-group' ? '' : Object.keys(groups)[i];
        html += `<ul class="sidebar-group">`;
        html += `<li class="sidebar-group-title"> ${groupName}
                    <button class="sidebar-action-button" type="button" id=\'${groupName}\' onclick=expandGroup(\'${groupName}\', "none")>
                        <img class="icon" src="./icons/expand-group-icon.svg">
                    </button>
                </li>`;
        i++;
        for (const location in groups[groupName]) {
            const g = groups[groupName];
            // const liElement = `<li class="locationItem" locationId="${g[location].id}" title="${g[location].locationTitle}" groupName="${g[location].groupName}"> ${g[location].locationTitle} <button type="button" hx-post="/removeLocation" hx-target="#sidebar" hx-swap="outerHTML"  hx-vars='{"locationId": "${location.id}", "title": "${location.locationTitle}", "groupName": "${g[location].groupName}"}'>DEL</button> </li>`;
            const liElement = `
                  <li class="sidebar-location" locationId="${g[location].id}" title="${g[location].locationTitle}" groupName="${g[location].groupName}">
                      <span class="sidebar-location-title">${g[location].locationTitle}</span>
                      <div class="location-buttons">
                            <button class="sidebar-action-button" type="button" name="goto-btn" data-location-lng=\"${g[location].source.features[0].geometry.coordinates[0][0][0]}\" data-location-lnt=\"${g[location].source.features[0].geometry.coordinates[0][0][1]}\">
                                <img class="icon" src="./icons/goto-icon.png" name="goto-btn" data-location-lng=\"${g[location].source.features[0].geometry.coordinates[0][0][0]}\" data-location-lnt=\"${g[location].source.features[0].geometry.coordinates[0][0][1]}\">
                            </button>
                            <button class="sidebar-action-button" type="button" name="edit-btn" data-group-name=\"${groupName}\" data-loc-id=\"${g[location].locationTitle}\">
                                <img class="icon" src="./icons/expand-icon.svg" name="edit-btn" data-group-name=\"${groupName}\" data-loc-id=\"${g[location].locationTitle}\">
                            </button>
                            <button class=\"sidebar-action-button\" type=\"button\" name="del-btn" data-location-id=\"${g[location].id}\" data-location-title=\"${g[location].locationTitle}\" data-location-groupName=\"${g[location].groupName}\">
                                <img class="icon" src="./icons/del-icon.png" name="del-btn" data-location-id=\"${g[location].id}\" data-location-title=\"${g[location].locationTitle}\" data-location-groupName=\"${g[location].groupName}\">
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
    },
    updateLocation: async (req, res) => {
        const userToken = getUserId(req);
        const locationInfo = req.body;
        if (userToken) {
            return await mapModel.updateLocation(userToken.id, locationInfo);
        }
        return {success: false, message: `Could not update ${locationInfo.groupName}.`};
    },
    getGeoJson: async (req, res) => {
        const userToken = getUserId(req);
        const user = await mapModel.getUser(userToken.id);
        return res.send(user.groups);
    },
    getLocationGeoJson: async (req, res) => {
        const userToken = getUserId(req);
        const location = await mapModel.getLocationById(userToken.id, req.body.locationTitle, req.body.groupName);
        res.send(location.source);
    }
};

export default mapController;
