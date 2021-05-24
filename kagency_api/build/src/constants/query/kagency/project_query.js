"use strict";
const ProjectQuery = {
    FIND_ALL: () => "SELECT * FROM k_project",
    FIND_BY_ID: (uuid) => `SELECT * FROM k_project WHERE uuid=${uuid}`,
    CREATE: (data) => `INSERT INTO k_project (uuid, title, description, sub_description, detail, created_by, updated_by) 
      VALUES ('${data.uuid}', '${data.title}', '${data.description}', '${data.sub_description}', '${data.detail}', '${data.created_by}', '${data.updated_by}')`,
    UPDATE_BY_ID: (uuid, data) => `UPDATE k_project SET name='${data.name}', description='${data.description}' 
      WHERE uuid=${uuid}`,
};
module.exports = ProjectQuery;
//# sourceMappingURL=project_query.js.map