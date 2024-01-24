import db from '../database.js';
import { ObjectId } from 'mongodb';



async function getUser(id) {
    const collection = await db.collection('Users');
    return collection.findOne({_id: new ObjectId(id)});
}

async function getAllGroups(id) {
    const user = await getUser(id);
    return user.groups;
}

function findGroup(groups, groupName) {
    if (groups.hasOwnProperty(groupName)) {
        return groups[groupName];
    }
    return false;
}

function checkTitleDuplicate(groups, locationTitle) {
    for (const groupName in groups) {
        const groupArray = groups[groupName];

        for (const locationObject of groupArray) {
            if (locationObject.locationTitle === locationTitle) {
                console.log(`Location title "${locationTitle}" found in group "${groupName}".`);
                return true;
            }
        }
    }
    return false;
}

async function addLocation(userId, {locationInfo}){
    const collection = await db.collection('Users');
    const user = await getUser(userId);
    locationInfo = { id: new ObjectId(), ...locationInfo }
    if (user) {
        const groups = user.groups;

        if (checkTitleDuplicate(groups, locationInfo.locationTitle)) {
            return {success: false, message: `Could not add location: ${locationInfo.groupName}, location name is already taken.`, groups: groups};
        }

        if (locationInfo.groupName){
            const group = findGroup(groups, locationInfo.groupName);

            if (group) {
                //groups exists
                group.push(locationInfo);
            } else {
                //new group
                groups[locationInfo.groupName] = [];
                groups[locationInfo.groupName].push(locationInfo);
            }
        } else {
            //group name is blank
            locationInfo.groupName = 'no-group';
            groups['no-group'].push(locationInfo);

        }

        const filter = { _id: new ObjectId(userId) };
        const update = { $set: { groups: groups } };

        const updateResult = await collection.updateOne(filter, update);
        console.log({updateResult});

        return {success: true, message: `Successfully added ${locationInfo.groupName}.`, groups: groups};
    }
    console.log("user doesn't exists")
    return {success: false, message: `Could not add location user does not exit.`};

}

async function removeLocation (userId, {locationInfo}) {
    const collection = await db.collection('Users');
    const user = await getUser(userId);
    const groups = user.groups;

    if (groups.hasOwnProperty(locationInfo.groupName)) {
        let i = 0
        for (const location in groups[locationInfo.groupName]) {
            let l = groups[locationInfo.groupName][location];

            if (l.id.toString() === locationInfo.locationId){
                groups[locationInfo.groupName].splice(i, 1);
                if (groups[locationInfo.groupName].length <= 0 && locationInfo.groupName !== 'no-group'){
                    delete groups[locationInfo.groupName];
                }
                break;
            }
            i++;
        }
    }

    const filter = { _id: new ObjectId(userId) };
    const update = { $set: { groups: groups } };

    const updateResult = await collection.updateOne(filter, update);
    console.log({updateResult});

    return {success: true, message: `Successfully removed ${locationInfo.groupName}.`, groups: groups};
}
async function expandGroup (userId, groupName) {
    const user = await getUser(userId);
    const groups = user.groups;
    return groups[groupName] || [];
}

async function updateLocation(userId, locationInfo) {
    const collection = await db.collection('Users');
    const user = await getUser(userId);
    const locationId = locationInfo.id;
    const groups = user.groups;
    const group = groups[locationInfo.groupName];

    for (const location in group) {
        let l = group[location];
        if (group[location].id.toString() === locationInfo.id){
            for (const prop in locationInfo) {
                if (l.hasOwnProperty(prop)) {
                    l[prop] = locationInfo[prop];
                }
            }
        }
    }

    const filter = { _id: new ObjectId(userId) };
    const update = { $set: { groups: groups } };

    const updateResult = await collection.updateOne(filter, update);
    console.log({updateResult});

    return {success: true, message: `Successfully updated ${locationInfo.groupName}.`};

}


export default {
    addLocation,
    removeLocation,
    expandGroup,
    getUser,
    getAllGroups,
    updateLocation
};
