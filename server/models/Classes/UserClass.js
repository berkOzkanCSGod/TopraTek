


class User {

    constructor(username, email, password, settings={}, createdAt=new Date(), locations=[], groups={}){
        this.username = username;
        this.email = email;
        this.password = password;
        this.settings = settings; //set equalt to {object}
        this.createdAt = createdAt;
        this.locations = locations;
        this.groups = groups;
    }

    toJSON() {
        return {
            username: this.username,
            email: this.email,
            password: this.password,
            settings: this.settings,
            createdAt: this.createdAt,
            locations: this.locations,
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