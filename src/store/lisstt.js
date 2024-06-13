import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar';
import checkAuth from '../auth/checkAuth';
import { Modal, Button } from 'react-bootstrap';

function ListPosts() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal
  const [movieIdToDelete, setMovieIdToDelete] = useState(null); // State to track the movie id to delete
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchMovies();
    }
  }, [user]);

  function fetchMovies() {
    setLoading(true);
    axios
      .get('http://127.0.0.1:8000/movieapi/list_event', {
        headers: { Authorization: `Token ${user.token} `},
      })
      .then((response) => {
        const moviesWithEnabledTrue = response.data.map(movie => ({ ...movie, enabled: true }));
        setMovies(moviesWithEnabledTrue);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      });
  }

  function toggleMovieStatus(movieId, enabled) {
    axios
      .put(`http://127.0.0.1:8000/movieapi/${movieId}/toggle_movie_status`,{ enabled }, {
        headers: { Authorization: `Token ${user.token}` },
      })
      .then(() => {
        fetchMovies();
      })
      .catch((error) => {
        console.error('Error toggling movie status:', error);
        setError('Failed to toggle movie status. Please try again later.');
      });
  }

  function handleDeleteClick(movieId) {
    setMovieIdToDelete(movieId); // Set the movie id to delete
    setShowModal(true); // Show the modal
  }

  function handleConfirmDelete() {
    if (movieIdToDelete) {
      setLoading(true);
      axios
        .delete(`http://127.0.0.1:8000/movieapi/delete_event/${movieIdToDelete}`, {
          headers: { Authorization: `Token ${user.token} `},
        })
        .then(() => {
          setLoading(false);
          setShowModal(false); // Hide the modal after successful deletion
          fetchMovies(); // Fetch updated movie list
        })
        .catch((error) => {
          console.error('Error deleting movie:', error);
          setError('Failed to delete movie. Please try again later.');
          setLoading(false);
        });
    }
  }

  return (
    <div style={{ backgroundColor: '#ADD8E6', minHeight: '100vh', padding: '20px 0' }}>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">
              <b>Movie List</b>
            </h1>
            {user && (
              <div>
                <Link to="/blog/posts/create" className="btn btn-danger mb-3">
                  Create Movie
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            movies.map((movie) => (
              <div key={movie.id} className="col-md-4 mb-4">
                <div className="card">
                  {movie.enabled ? (
                    <div style={{ height: '300px', overflow: 'hidden' }}>
                      <img
                        src={`http://127.0.0.1:8000${movie.poster}`}
                        className="card-img-top"
                        alt={movie.title}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                  ) : (
                    <div className="disabled-image" style={{ height: '300px', backgroundColor: 'lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span>Disabled</span>
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">Genre: {movie.genre}</p>
                    <p className="card-text">Description: {movie.description}</p>
                    <p className="card-text">Release Date: {movie.release_date}</p>
                    <button
                      onClick={() => toggleMovieStatus(movie.id, !movie.enabled)}
                      className={`btn ${loading ? 'btn-primary' : movie.enabled ? 'btn-secondary' : 'btn-primary'}`}
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : movie.enabled ? 'Disable' : 'Enable'}
                    </button>
                    {movie.enabled && (
                      <>
                        <Link to={`/blog/posts/${movie.id}/edit`} className="btn btn-primary ml-2">Edit</Link>
                        <Button variant="danger" className="ml-2" onClick={() => handleDeleteClick(movie.id)}>Delete</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Modal for delete confirmation */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this movie?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleConfirmDelete} disabled={loading}>{loading ? 'Deleting...' : 'Delete'}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default checkAuth(ListPosts);