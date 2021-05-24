import React from "react";

const EntrySelect = () => {
  return (
    <div className="col-sm-12 col-md-6">
      <div className="dataTables_length" id="dataTable_length">
        <label>
          Show
          <select
            name="dataTable_length"
            aria-controls="dataTable"
            className="custom-select custom-select-sm form-control form-control-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          entries
        </label>
      </div>
    </div>
  );
};

export default EntrySelect;
