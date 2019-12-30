const permissions = require("../db/queries");
const permissionBaseQuery = require("../db/permission");

async function getAll() {
    try {
        const applyGetAll = permissions.getAll();
        const results = await applyGetAll(permissionBaseQuery());
        return results;
    } catch (error) {
        throw error;
    }
}

async function create({ resource, action }) {
    const values = {
        resource,
        action
    };

    try {
        const applyCreate = permissions.create(values);
        const successed = await applyCreate(permissionBaseQuery());

        if (successed > 0) {
            const results = await countTotalAndGetRecordPerPage({
                page: 0,
                page_size: 4
            });
            return results;
        }
    } catch (err) {
        throw err;
    }
}

async function deleteById({ id }) {
    try {
        const applyDeleteById = permissions.deleteById({ id });
        const numOfRowEffect = await applyDeleteById(permissionBaseQuery());

        if (numOfRowEffect > 0) {
            const results = await countTotalAndGetRecordPerPage({
                page: 0,
                recordPerPage: 4
            });
            return results;
        }
    } catch (error) {
        throw error;
    }
}

async function updateById({ id, resource, action }) {
    const values = {
        resource,
        action
    };
    try {
        const applyUpdateById = permissions.updateById(id, values);
        const numOfRowEffect = await applyUpdateById(permissionBaseQuery());
        if (numOfRowEffect > 0) {
            const results = await countTotalAndGetRecordPerPage({
                page: 0,
                recordPerPage: 4
            });
            return results;
        }
    } catch (error) {
        throw error;
    }
}

// SELECT * FROM tbl LIMIT 5,10;  # Retrieve rows 6-15
async function countTotalRecord() {
    try {
        const applyCount = permissions.countTotalRecord();
        const results = await applyCount(permissionBaseQuery());
        return results[0].TOTAL;
    } catch (err) {
        throw err;
    }
}

async function getRecordPerPage({ page, page_size }) {
    try {
        const applyRecordPerPageWithOrder = permissions.recordPerPageWithOrder({
            page,
            page_size,
            orderByColumn: "created_at"
        });
        const results = await applyRecordPerPageWithOrder(
            permissionBaseQuery()
        );

        return results;
    } catch (err) {
        throw err;
    }
}

async function countTotalAndGetRecordPerPage({ page, page_size }) {
    try {
        let permissionsPromise = getRecordPerPage({ page, page_size });
        let totalRecordPromise = countTotalRecord();

        const [permissions, totalRecord] = [
            await permissionsPromise,
            await totalRecordPromise
        ];
        return {
            permissions,
            totalRecord
        };
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAll,
    create,
    deleteById,
    updateById,
    countTotalRecord,
    getRecordPerPage,
    countTotalAndGetRecordPerPage
};
