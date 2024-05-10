import React, { useState } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import appStyle from "./App.module.css";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUserDetails] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://192.168.1.10:7500/api/auths/login', user);
            console.log('Response:', response.data);
            navigate('/Navbar');
            Swal.fire({
                icon: 'success',
                title: 'Login successful',
                showConfirmButton: false,
                timer: 2000
            });
        } catch (error) {
            console.error('Error:', error.response ? error.response.data.error : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',               
                text: error.response ? error.response.data.error : error.message,
                timer: 4000,
                showConfirmButton: false,
                position: 'top-center'
            });
        }
        setLoading(false); 
    };

    return (
        <div className={`${loginstyle.login} ${appStyle.App}`}> 
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={user.email}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={user.password}
                />
                <button type="submit" className={basestyle.button_common}>
                    {loading ? 'Loading...' : 'Login'} 
                </button>
            </form>
        </div>
    );
};

export default Login;

