const RoleQuery = {
  FIND_ALL: () => "SELECT * FROM k_role",
  FIND_BY_ID: (id: number) => `SELECT * FROM k_role WHERE id='${id}'`,
  CREATE: (data: any) =>
    `INSERT INTO k_role (name, description) 
    VALUES ('${data.name}', '${data.description}')`,
  UPDATE_BY_ID: (id: number, data: any) =>
    `UPDATE k_role SET name='${data.name}', description='${data.description}' 
    WHERE id=${id}`,
};
export = RoleQuery;
