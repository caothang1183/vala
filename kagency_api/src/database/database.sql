
CREATE TABLE IF NOT EXISTS k_role (
  id SERIAL UNIQUE PRIMARY KEY NOT NULL,
  name varchar(20),
  description text,
  created_at timestamp DEFAULT (now())
);

INSERT INTO k_role (id, name, description) VALUES (0, 'Unknown', 'No Permission');
INSERT INTO k_role (id, name, description) VALUES (1, 'SuperAdmin', 'Control Full Permission');
INSERT INTO k_role (id, name, description) VALUES (2, 'Admin', 'Control Employee Permission');
INSERT INTO k_role (id, name, description) VALUES (3, 'Developer', 'Maintain BE/FE');
INSERT INTO k_role (id, name, description) VALUES (4, 'Content Writer', 'Write Content for Web');

CREATE TABLE IF NOT EXISTS k_user (
  id varchar(255) PRIMARY KEY NOT NULL,
  role_id int NOT NULL DEFAULT 0,
  first_name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL,
  email varchar(35) NOT NULL,
  password text NOT NULL,
  activated boolean DEFAULT false,
  blocked boolean DEFAULT false,
  updated_at timestamp,
  created_at timestamp DEFAULT (now())
);

INSERT INTO k_user (id, role_id,first_name, last_name, email, password) 
VALUES ('5b557284-4f21-4223-950d-358120b9d3b4', 3, 'Kagency', 'Test', 'test1234@gmail.com', '$2b$10$zjyEIiKe3a8feFTvNH0GVOP2Gkhij2dvaBJ7iiXZJqN/Rv./L2y6e');

CREATE TABLE IF NOT EXISTS k_project (
  id varchar(255) PRIMARY KEY NOT NULL,
  url text NOT NULL,
  project_name varchar(255) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  topic_id int NOT NULL DEFAULT 0,
  deleted boolean DEFAULT false,
  updated_by varchar(255) NULL,
  updated_at timestamp,
  created_by varchar(255) NULL,
  created_at timestamp DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS k_topic (
  id SERIAL UNIQUE PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  deleted boolean DEFAULT false,
  updated_by varchar(255) NULL,
  updated_at timestamp,
  created_by varchar(255) NULL,
  created_at timestamp DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS k_blog (
  id varchar(255) PRIMARY KEY NOT NULL,
  url text NOT NULL,
  title varchar(255) NOT NULL,
  content text NOT NULL,
  category_id int NOT NULL DEFAULT 0,
  deleted boolean DEFAULT false,
  updated_by varchar(255) NULL,
  updated_at timestamp,
  created_by varchar(255) NULL,
  created_at timestamp DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS k_category (
  id SERIAL UNIQUE PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  deleted boolean DEFAULT false,
  updated_by varchar(255) NULL,
  updated_at timestamp,
  created_by varchar(255) NULL,
  created_at timestamp DEFAULT (now())
);

ALTER TABLE k_project_topic ADD CONSTRAINT project_id_fk FOREIGN KEY (project_id) REFERENCES k_project (id);
ALTER TABLE k_project_topic ADD CONSTRAINT topic_id_fk FOREIGN KEY (topic_id) REFERENCES k_topic (id); 
ALTER TABLE k_user ADD CONSTRAINT role_user_fk FOREIGN KEY (role_id) REFERENCES k_role(id);
ALTER TABLE k_project ADD CONSTRAINT project_created_user_fk FOREIGN KEY (created_by) REFERENCES k_user (id);
ALTER TABLE k_project ADD CONSTRAINT project_updated_user_fk FOREIGN KEY (updated_by) REFERENCES k_user (id);