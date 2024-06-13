import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";



function Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function attemptLogin() {
        axios.post('https://medicalstore.mashupstack.com/api/login', {
            email: email,
            password: password,
        }).then(response => {
            setErrorMessage('');
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            var user = {
                email: email,
                token: token
            }
            dispatch(setUser(user));
            navigate("/home");
        }).catch(error => {
            if (error.response.data.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(''));
            } else if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Failed to login user.');
            }
        })
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh"}}>
            <div className="row p-4 col-md-8 rounded bg-light">
                <div className="col-md-12 ">
                    <h1 className="text-center mb-4" style={{fontSize:"35px"}}>Login</h1>
                    {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password"
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <Link to={'/register'} className="float-left">Create an account </Link>
                        <button className="btn btn-primary float-right" onClick={attemptLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
