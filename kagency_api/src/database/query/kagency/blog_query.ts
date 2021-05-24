import { StringUtils } from "@utils";

var format = require('pg-format');

const BlogQuery = {
  FIND_ALL: () => "SELECT * FROM k_blog WHERE deleted=FALSE ORDER BY created_at DESC",
  FIND_BY_ID: (id: string) =>
    `SELECT * FROM k_blog WHERE id='${id}'`,
  CREATE: (data: any) =>
    format('INSERT INTO k_blog (id, url, title, content, category_id, created_by, updated_by) VALUES %L', data),
  UPDATE_BY_ID: (id: string, data: any) => {
    return `UPDATE k_blog SET 
        url='${data.url}', 
        title='${data.title}', 
        content='${StringUtils.convertHTMLData(data.content)}', 
        category_id='${data.category_id}',
        updated_by='${data.updated_by}', 
        updated_at=CURRENT_TIMESTAMP WHERE id='${id}'`},
  DELETE_BY_ID: (id: string) =>
    `UPDATE k_blog SET deleted=TRUE WHERE id='${id}'`,
  DELETE_ALL: () => `UPDATE k_blog SET deleted=TRUE`,
  CLEAR_TABLE: () => `DELETE FROM k_blog`,
};
export = BlogQuery;
