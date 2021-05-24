var format = require('pg-format');

const TopicQuery = {
  FIND_ALL: () => "SELECT * FROM k_topic WHERE deleted=FALSE ",
  FIND_BY_ID: (id: string) =>
    `SELECT * FROM k_topic WHERE id='${id}'`,
  FIND_BY_NAME: (name: string) =>
    `SELECT * FROM k_topic WHERE name='${name}'`,
  CREATE: (data: any) =>
    format('INSERT INTO k_topic (name) VALUES %L', data),
    
  UPDATE_BY_ID: (id: string, data: any) => {
    return `UPDATE k_topic SET 
        name='${data.name}',
        category_id=${data.category_id},
        updated_by='${data.updated_by}', 
        updated_at=CURRENT_TIMESTAMP WHERE id='${id}'`},
  DELETE_BY_ID: (id: string) =>
    `UPDATE k_topic SET deleted=TRUE WHERE id='${id}'`,
  DELETE_ALL: () => `UPDATE k_topic SET deleted=TRUE`,
  CLEAR_TABLE: () => `DELETE FROM k_topic`,
};
export = TopicQuery;