import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const ProjectDocument = () => (
  <div className="container mt-4">
    <div className="row justify-content-center">
      <div className="col-md-8"> {/* Increase the column size to make the card wider */}
      <div className="card wide-card">
          <div className="card-body">
            <h5>Project Files</h5>
            <table className="table table-striped project-docs-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Contract Agreement</td>
                  <td>12th Jan 2024</td>
                  <td>
                    <a href="#" className="btn btn-info btn-sm">
                      Download
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Blueprints</td>
                  <td>20th Jan 2024</td>
                  <td>
                    <a href="#" className="btn btn-info btn-sm">
                      Download
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Permits</td>
                  <td>22nd Jan 2024</td>
                  <td>
                    <a href="#" className="btn btn-info btn-sm">
                      Download
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <button className="btn btn-primary file-upload-btn">
              Upload Document
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectDocument;
