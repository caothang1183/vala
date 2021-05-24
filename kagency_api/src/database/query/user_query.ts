const UserQuery = {
  FIND_ALL: () => "SELECT * FROM k_user",
  FIND_BY_ID: (id: string) => `SELECT * FROM k_user u WHERE id='${id}'`,
  CREATE: (data: any) => `INSERT INTO k_user (uuid, role_id, first_name, last_name, email, password) VALUES ('${data.uuid}', 0,'${data.firstName}', '${data.lastName}','${data.email}', '${data.password}')`,
  UPDATE_BY_ID: (id: string, data: any) => `UPDATE k_user SET name='${data.name}', description='${data.description}' WHERE id=${id}`,
  FIND_BY_EMAIL: (email: string) => `SELECT * FROM k_user U WHERE email='${email}'`,
};

export = UserQuery;
