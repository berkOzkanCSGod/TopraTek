import db from '../database.js';
import { ObjectId } from 'mongodb';



async function getUser(id) {
    const collection = await db.collection('Users');
    return collection.findOne({_id: new ObjectId(id)});
}

function findGroup(groups, groupName) {
    for (let i = 0; i < Object.keys(groups).length; i++){
        if (groupName === Object.keys(groups)[i]){
            return Object.keys(groups)[i];
        }
    }
    return false;
}

function checkTitleDuplicate(group, locationTitle) {
    return group.some(function(element) {
        return element.locationTitle === locationTitle;
    });
}

async function addLocation(userId, {locationInfo}){
    const collection = await db.collection('Users');
    const user = await getUser(userId);

    if (user) {
        const groups = user.groups;

        if (locationInfo.groupName){
            const group = findGroup(groups, locationInfo.groupName);

            if (group) {
                //groups exists
                if (checkTitleDuplicate(groups[group], locationInfo.locationTitle)) {
                    return {success: false, message: `Could not add location: ${locationInfo.groupName}, location name if already taken.`};
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
                return {success: false, message: `Could not add location: ${locationInfo.groupName}, location name if already taken.`};
            }
            groups['no-group'].push(locationInfo);
        }

        const filter = { _id: new ObjectId(userId) };
        const update = { $set: { groups: groups } };

        const updateResult = await collection.updateOne(filter, update);
        console.log({updateResult});
        return {success: true, message: `Successfully added ${locationInfo.groupName}.`};
    }
    console.log("user doesn't exists")
    return {success: false, message: `Could not add location user does not exit.`};

}

export default {
    addLocation
};
