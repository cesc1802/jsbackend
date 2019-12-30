const userService = require("../services/user.service");

const getAll = (req, res) => {
    userService
        .getAll()
        .then(users => {
            return res.status(200).json({ status: "success", users });
        })
        .catch(error => {
            return res.status(500).json({ data: { message: error } });
        });
};

const register = (req, res) => {
    const { username, password, role_id } = req.body;
    if (!username || !password)
        return res.status(400).json({
            message: "Username and password are required"
        });

    userService
        .register({ username, password, role_id })
        .then(users => {
            return res.status(200).json({ status: "success", users });
        })
        .catch(err => {
            return res.status(400).json({ data: { message: err } });
        });
};

const deleteById = (req, res) => {
    const { id } = req.params;
    userService
        .deleteById({ id })
        .then(users => {
            return res.status(200).json({ status: "success", users });
        })
        .catch(error => {
            return res.status(500).json({ status: "failure", error });
        });
};

const updateById = (req, res) => {
    const { id } = req.params;
    const { username, password, role_id } = req.body;
    userService
        .updateById({ id, username, password, role_id })
        .then(users => {
            return res.status(200).json({ status: "success", users });
        })
        .catch(error => {
            return res.status(500).json({ status: "success", error });
        });
};
module.exports = {
    getAll,
    register,
    deleteById,
    updateById
};
