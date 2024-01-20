import db from '../database.js';
import { ObjectId } from 'mongodb';



async function getUser(id) {
    const collection = await db.collection('Users');
    return collection.findOne({_id: new ObjectId(id)});
}

function findGroup(groups, groupName) {
    if (groups.hasOwnProperty(groupName)) {
        return groups[groupName];
    }
    return false;
}

function checkTitleDuplicate(group, locationTitle) {
    if (group) {
        return group.some(function(element) {
            return element.locationTitle === locationTitle;
        });
    }
    return false;
}

async function addLocation(userId, {locationInfo}){
    const collection = await db.collection('Users');
    const user = await getUser(userId);
    locationInfo = { id: new ObjectId(), ...locationInfo }
    if (user) {
        const groups = user.groups;
        if (locationInfo.groupName){
            const group = findGroup(groups, locationInfo.groupName);
            if (group) {
                //groups exists
                if (checkTitleDuplicate(groups[group], locationInfo.locationTitle)) {
                    return {success: false, message: `Could not add location: ${locationInfo.groupName}, location name if already taken.`, groups: groups};
                }
                groups[group].push(locationInfo);
            } else {
                //new group
                groups[locationInfo.groupName] = [];
                groups[locationInfo.groupName].push(locationInfo);
            }
        } else {
            //group name is blank
            if (checkTitleDuplicate(groups['no-group'], locationInfo.locationTitle)) {
                return {success: false, message: `Could not add location: ${locationInfo.groupName}, location name if already taken.`, groups: groups};
            }
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

    console.log({groups})
    if (groups.hasOwnProperty(locationInfo.groupName)) {
        console.log("found match")
        groups[locationInfo.groupName] = groups[locationInfo.groupName].filter(loc => !loc.id.equals(locationInfo.locationId));
    }
    console.log("-------- groups --------")
    console.log({groups})

    const filter = { _id: new ObjectId(userId) };
    const update = { $set: { groups: groups } };

    const updateResult = await collection.updateOne(filter, update);
    console.log({updateResult});

    return {success: true, message: `Successfully removed ${locationInfo.groupName}.`, groups: groups};
}

export default {
    addLocation,
    removeLocation,
    getUser
};
