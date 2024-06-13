import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import MedtListItem from "./MedtListItem";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function ListMed() {
  const [allMeds, setAllMeds] = useState([]);
  const [filteredMeds, setFilteredMeds] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const user = useSelector((store) => store.auth.user);
  var navigate =useNavigate();

  const handleSearchInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (SearchTerm.trim() === "") {
      setFilteredMeds(allMeds);
    } else {
      const filteredItems = allMeds.filter((item) =>
        item.name.toLowerCase().startsWith(SearchTerm.toLowerCase())
      );
      setFilteredMeds(filteredItems);
    }
  };

  function fetchMeds() {
    if (user && user.token) {
      axios
        .get("https://medicalstore.mashupstack.com/api/medicine", {
          headers: { Authorization: "Bearer " + user.token },
        })
        .then((response) => {
          setAllMeds(response.data);
          setFilteredMeds(response.data);
        })
        .catch((error) => {
          console.error("Error fetching medicines: ", error);
        });
    } else {
      console.error("User object or token is null");
    }
  }

  useEffect(() => {
    fetchMeds();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Medicine</h1>
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-3">
          <div className="col-md-6">
            <form>
              <label>Search Medicine:</label>&nbsp;&nbsp;
              <input
                type="text"
                value={SearchTerm}
                onChange={handleSearchInputChange}
              />{" "}
              &nbsp;
              <button
                className="btn btn-small btn-success"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
              &nbsp;
            </form>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-8 col-md-8 offset-2">
            <Link to="/medicine/create" className="btn btn-info mb-2">
              Create Medicine
            </Link>
            {filteredMeds.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
              filteredMeds.map((med) => (
                <MedtListItem key={med.id} med={med} refresh={fetchMeds} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListMed);
