const config = require('../config/rbac.cfg');
const RBAC = require('rbac').RBAC;

module.exports = async () => {
    const rbac = new RBAC(config);
    await rbac.init();
    return rbac;
};
