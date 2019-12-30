const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../db/queries");
const userBaseQuery = require("../db/user");

async function getAll() {
    try {
        const applyGetAll = users.getAll();
        const results = await applyGetAll(userBaseQuery());
        return results;
    } catch (error) {
        throw error;
    }
}

async function register({ username, password, role_id }) {
    const options = {
        field: "username",
        value: username
    };

    try {
        const applyFilterByName = users.filterByName(options);
        const results = await applyFilterByName(userBaseQuery());

        if (results.length > 0) {
            throw new Error(`user name ${username} is already taken`);
        } else {
            const values = {
                username: username,
                password: brcypt.hashSync(password, 10),
                role_id: role_id
            };
            const applyCreate = users.create(values);
            const successed = await applyCreate(userBaseQuery());

            if (successed > 0) {
                const users = await getAll();
                return users;
            }
        }
    } catch (error) {
        throw error;
    }
}

async function login({ username, password }) {
    const options = {
        field: "username",
        value: username
    };
    try {
        const applyFilterByName = users.filterByName(options);
        const user = await applyFilterByName(userBaseQuery());

        //TODO: need to review check condition when exists 2 user has same username

        if (
            user[0] !== undefined &&
            brcypt.compareSync(password, user[0].password)
        ) {
            const token = jwt.sign(
                {
                    id: user[0].id,
                    roleId: user[0].role_id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );
            return {
                accessToken: token,
                tokenType: "Bearer"
            };
        } else {
            throw new Error("Username or Password is incorrect");
        }
    } catch (error) {
        throw error.message;
    }
}

async function deleteById({ id }) {
    try {
        const applyDeleteById = users.deleteById({ id });
        const numOfRowEffect = await applyDeleteById(userBaseQuery());

        if (numOfRowEffect > 0) {
            const users = await getAll();
            return users;
        }
    } catch (error) {
        throw error;
    }
}

async function updateById({ id, username, password, role_id }) {
    const values = {
        username,
        password: brcypt.hashSync(password, 10),
        role_id
    };
    try {
        const applyUpdateById = users.updateById(id, values);
        const numOfRowEffect = await applyUpdateById(userBaseQuery());
        if (numOfRowEffect > 0) {
            const results = await getAll();
            return results;
        }
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getAll,
    register,
    login,
    deleteById,
    updateById
};
