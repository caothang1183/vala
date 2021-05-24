var format = require('pg-format');

const CategoryQuery = {
  FIND_ALL: () => "SELECT * FROM k_category WHERE deleted=FALSE ",
  FIND_BY_ID: (id: string) =>
    `SELECT * FROM k_category WHERE id='${id}'`,
  CREATE: (data: any) =>
    format('INSERT INTO k_category (name) VALUES %L', data),
    
  UPDATE_BY_ID: (id: string, data: any) => {
    return `UPDATE k_category SET 
        name='${data.name}',
        updated_by='${data.updated_by}', 
        updated_at=CURRENT_TIMESTAMP WHERE id='${id}'`},
  DELETE_BY_ID: (id: string) =>
    `UPDATE k_category SET deleted=TRUE WHERE id='${id}'`,
  DELETE_ALL: () => `UPDATE k_category SET deleted=TRUE`,
  CLEAR_TABLE: () => `DELETE FROM k_category`,
};
export = CategoryQuery;