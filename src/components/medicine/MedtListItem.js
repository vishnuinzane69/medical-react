import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";

function MedtListItem(props) {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((store) => store.auth.user);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const deleteMedicine = () => {
    axios
      .delete(
        "https://medicalstore.mashupstack.com/api/medicine/" + props.med.id,
        {
          headers: { Authorization: "Bearer " + user.token },
        }
      )
      .then((response) => {
        props.refresh();
        toggleModal(); // Close the modal after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting medicine:", error);
        // Handle error appropriately (e.g., show error message)
      });
  };

  return (
    <div className="card text-dark bg-light mt-1">
      <div className="card-body">
        {props.med.name}
        <button
          className="btn btn-danger float-right ml-1"
          onClick={toggleModal} // Open confirmation modal
        >
          Delete
        </button>
        <Link
          to={"/medicine/edit/" + props.med.id}
          className="btn btn-warning float-right ml-1"
        >
          Edit
        </Link>
        <Link
          to={"/medicine/view/" + props.med.id}
          className="btn btn-info float-right ml-1"
        >
          View
        </Link>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark">Confirm Deletion</h5>
                <button
                  type="button"
                  className="close"
                  onClick={toggleModal} // Close modal when close button is clicked
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body text-dark">
                Are you sure you want to delete this medicine {props.med.name}?
              </div>
              <div className="modal-footer text-dark">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleModal} // Close modal when cancel button is clicked
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={deleteMedicine} // Delete medicine when confirm button is clicked
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default checkAuth(MedtListItem);
