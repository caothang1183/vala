"use strict";
const RoleQuery = {
    FIND_ALL: () => "SELECT * FROM k_role",
    FIND_BY_ID: (id) => `SELECT * FROM k_role WHERE id=${id}`,
    CREATE: (data) => `INSERT INTO k_role (name, description) 
    VALUES ('${data.name}', '${data.description}')`,
    UPDATE_BY_ID: (id, data) => `UPDATE k_role SET name='${data.name}', description='${data.description}' 
    WHERE id=${id}`,
};
module.exports = RoleQuery;
//# sourceMappingURL=role_query.js.map