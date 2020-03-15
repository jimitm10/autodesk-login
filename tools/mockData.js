const users = [{
    firstName: "test",
    lastName: "test",
    userName: "testUser",
    password: "testPass",
    id: 1
}];

const newUser = {
    userName: "",
    password: "",
    firstName: "",
    lastName: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
    newUser,
    users
};