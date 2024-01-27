import db from '../database.js';
import { ObjectId } from 'mongodb';
import bcrypt from "bcrypt";
import {response} from "express";
import User from "./Classes/UserClass.js";

async function login(username, password) {
    const collection = await db.collection('Users');
    return collection.findOne({username: username});
}

async function getUser(id) {

}

async function signup(username, email, password) {
    const collection = await db.collection('Users');
    const user = new User(username, email, password);
    return await collection.insertOne(user.toJSON());
}

async function userExists(username) {
    const collection = await db.collection('Users');
    return await collection.findOne({username: username});
}

export default {
    login,
    signup,
    userExists
};
