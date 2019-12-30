const filterById = ({ id }) => {
    return query => query.where("id", id);
};

const filterByName = (options = {}) => {
    return query => query.where(options.field, options.value);
};

const create = (values = {}) => {
    return query => query.insert(values);
};

const updateById = (id, values = {}) => {
    return query => query.where("id", id).update(values);
};

const getAll = () => {
    return query => query.select();
};

const deleteById = ({ id }) => {
    return query => query.where("id", id).del();
};

const deleteByIds = ids => {
    return query => query.whereIn("id", ids).del();
};

const countTotalRecord = () => {
    return query => query.count("* as TOTAL");
};

const recordPerPage = ({ page, recordPerPage }) => {
    return query => query.limit(recordPerPage).offset(page * recordPerPage);
};

const recordPerPageWithOrder = ({
    page,
    page_size,
    orderByColumn,
    option = "DESC"
}) => {
    return query =>
        query
            .limit(page_size)
            .offset(page * page_size)
            .orderBy(orderByColumn, option);
};
module.exports = {
    filterById,
    filterByName,
    create,
    updateById,
    getAll,
    deleteById,
    deleteByIds,
    countTotalRecord,
    recordPerPage,
    recordPerPageWithOrder
};
