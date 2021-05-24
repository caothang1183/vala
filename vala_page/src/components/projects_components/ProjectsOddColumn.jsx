import ProjectItem from "./ProjectItem";

const ProjectsOddColumn = ({
  headerComponent,
  projects,
  activate,
  loading,
}) => {
  console.log(loading);
  if (loading) {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 odd-col">
        <div className="col-12">{headerComponent}</div>
        <ProjectItem key={"1"} projects={""} Loading={true} />
        <ProjectItem key={"2"} projects={""} Loading={true} />
        <ProjectItem key={"3"} projects={""} Loading={true} />
      </div>
    );
  } else {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 odd-col">
        <div className="col-12">{headerComponent}</div>
        {projects.map((item, index) => (
          <ProjectItem key={index} project={item} activa={activate} />
        ))}
      </div>
    );
  }
};

export default ProjectsOddColumn;
