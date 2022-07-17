import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./App.css";

/* 

1. User enters creds
2. Make login API call
3. If true, store access token in session storage and navigate to App.js
4. If false, show error message from API

*/

const App = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = e => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/login', {
            name: name,
            password: password
        })
            .then(function (response) {
                sessionStorage.setItem("access-token", response.data['access_token']);
                navigate("/");
            }, error => alert("Login failed!"))
    };

    return <div className="App">
        <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="name">Name</label>
                <input name="name" required onChange={event => setName(event.target.value)} />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required onChange={event => setPassword(event.target.value)} />
            </div>
            <button className="primary">Login</button>
        </form>
    </div>
}


export default App;
