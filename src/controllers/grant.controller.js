const grantService = require("../services/grant.service");

const getAll = (req, res) => {
    grantService
        .getAll()
        .then(permissions => {
            return res.status(200).json({ status: "success", permissions });
        })
        .catch(error => {
            return res.status(500).json({ data: { message: error } });
        });
};

const create = (req, res) => {
    const { resource, action } = req.body;
    grantService
        .create({ resource, action })
        .then(payload => {
            return res.status(200).json({ status: "success", payload });
        })
        .catch(error => {
            return res.status(500).json({ data: { message: error } });
        });
};

const deleteById = (req, res) => {
    const { id } = req.params;
    grantService
        .deleteById({ id })
        .then(payload => {
            return res.status(200).json({ status: "success", payload });
        })
        .catch(error => {
            return res.status(500).json({ status: "failure", error });
        });
};

const updateById = (req, res) => {
    const { id } = req.params;
    const { resource, action } = req.body;
    grantService
        .updateById({ id, resource, action })
        .then(payload => {
            return res.status(200).json({ status: "success", payload });
        })
        .catch(error => {
            return res.status(500).json({ status: "failure", error });
        });
};

const countTotalAndGetRecordPerPage = (req, res) => {
    const { page, recordPerPage } = req.params;

    grantService
        .countTotalAndGetRecordPerPage({ page, recordPerPage })
        .then(payload => {
            return res.status(200).json({ status: "success", payload });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ status: "failure", err });
        });
};

module.exports = {
    getAll,
    create,
    deleteById,
    updateById,
    countTotalAndGetRecordPerPage
};
