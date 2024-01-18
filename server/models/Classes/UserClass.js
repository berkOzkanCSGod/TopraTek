


class User {

    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
        this.settings = {}; //set equalt to {object}
        this.createdAt = new Date();
        this.groups = {
            "no-group": []
        };
    }

    toJSON() {
        return {
            username: this.username,
            email: this.email,
            password: this.password,
            settings: this.settings,
            createdAt: this.createdAt,
            groups: this.groups
        }
    }

    //attributes
    username;
    email;
    password;
    settings; //json file
    createdAt;
    locations; //list of ids
    groups; //json of lists
}

export default User;