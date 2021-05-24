"use strict";
const UserQuery = {
    FIND_ALL: () => "SELECT * FROM k_user",
    FIND_BY_ID: (uuid) => `SELECT * FROM k_user u WHERE uuid='${uuid}'`,
    CREATE: (data) => `INSERT INTO k_user (uuid, role_id, first_name, last_name, email, password) VALUES ('${data.uuid}', 0,'${data.firstName}', '${data.lastName}','${data.email}', '${data.password}')`,
    UPDATE_BY_ID: (uuid, data) => `UPDATE k_user SET name='${data.name}', description='${data.description}' WHERE uuid=${uuid}`,
    FIND_BY_EMAIL: (email) => `SELECT * FROM k_user U WHERE email='${email}'`,
};
module.exports = UserQuery;
//# sourceMappingURL=user_query.js.map