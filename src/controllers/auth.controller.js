const userService = require("../services/user.service");
// const queueService = require("../db/queue");
// console.log(queueService);

const login = (req, res) => {
    const { username, password } = req.body;

    userService
        .login({ username, password })
        .then(token => {
            return res.status(200).json({ status: "success", token });
        })
        .catch(error => {
            console.log("auth controller", error);
            return res.status(401).json({ message: error });
        });
};

module.exports = {
    login
};
