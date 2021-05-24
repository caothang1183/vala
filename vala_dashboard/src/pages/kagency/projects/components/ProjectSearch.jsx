import React from "react";

const ProjectSearch = () => {
  return (
    <div className="col-sm-12 col-md-6">
      <div id="dataTable_filter" className="dataTables_filter">
        <label>
          Search:
          <input
            type="search"
            className="form-control form-control-sm"
            aria-controls="dataTable"
          />
        </label>
      </div>
    </div>
  );
};

export default ProjectSearch;
