import { StringUtils } from "@utils";

var format = require('pg-format');

const ProjectQuery = {
  FIND_ALL: (limit: number = 10) => `SELECT * FROM k_project WHERE deleted=FALSE ORDER BY created_at DESC LIMIT ${limit}`,
  FIND_BY_ID: (id: string) =>
    `SELECT * FROM k_project WHERE id='${id}'`,
  CREATE: (data: any) =>
    format('INSERT INTO k_project (id, url, project_name, title, topic_id, description, content, created_by, updated_by) VALUES %L', data),
    
  UPDATE_BY_ID: (id: string, data: any) => {
    return `UPDATE k_project SET 
        url='${data.url}', 
        project_name='${data.project_name}', 
        title='${data.title}', 
        topic_id='${data.topic_id}',
        description='${data.description}', 
        content='${StringUtils.convertHTMLData(data.content)}', 
        updated_by='${data.updated_by}', 
        updated_at=CURRENT_TIMESTAMP WHERE id='${id}'`},
  DELETE_BY_ID: (id: string) =>
    `UPDATE k_project SET deleted=TRUE WHERE id='${id}'`,
  DELETE_ALL: () => `UPDATE k_project SET deleted=TRUE`,
  CLEAR_TABLE: () => `DELETE FROM k_project`,
};
export = ProjectQuery;
