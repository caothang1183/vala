import InfoButton from "../InfoButton";
import ProjectItem from "./ProjectItem";

import React from "react";

const ProjectsEvenColumn = ({ projects, loading, activate }) => {
  if (loading) {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 even-col">
        <ProjectItem key={"1"} projects={""} Loading={true} />
        <ProjectItem key={"2"} projects={""} Loading={true} />
        <ProjectItem key={"3"} projects={""} Loading={true} />
      </div>
    );
  } else {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 even-col">
        {projects.map((item, index) => (
          <ProjectItem key={index} project={item} />
        ))}
        <div className="more-prjects">
          <InfoButton label="View More" horizontalPadding={true} />
        </div>
      </div>
    );
  }
};

export default ProjectsEvenColumn;
