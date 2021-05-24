class ProjectModel {
  constructor({ id, url, project_name, tags, title, description, content }) {
    this.id = id;
    this.url = url;
    this.project_name = project_name;
    this.tags = tags;
    this.title = title;
    this.description = description;
    this.content = content;
  }
}

export default ProjectModel;
