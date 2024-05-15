import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import style from './Navbar.module.css';

const userImage = 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1715774216~exp=1715774816~hmac=29e72da2776e077a0a47d7eb8201a6fc79d6fe1c19df9b22e6b0a1d7ff928a3f';

const Navbar = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in local storage');
            }
            localStorage.removeItem('token');
            Swal.fire({
                icon: 'success',
                title: 'Logout successful',
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/Login');
        } catch (error) {
            console.error('Error:', error?.response ? error.response.data.error : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.response ? error.response.data.error : error.message,
                timer: 4000,
                showConfirmButton: false,
                position: 'top-center'
            });
        }
    };
    
    const handleImageClick = async () => { 
        try {
            const userId = localStorage.getItem('id');
            if (!userId) {
                throw new Error('User ID not found in local storage');
            }
            const url = `http://192.168.1.7:7500/api/users/getUser/${userId}`;
            console.log('Fetching user data from:', url);
            const response = await axios.get(url);
            const { name, email } = response.data;
            console.log(response.data)
            window.alert(`Name: ${name}\nEmail: ${email}`);
        } catch (error) {
            console.error('Error:', error.message);
            window.alert(error.message);
        }
    };


    
    return (
        <div className={style.navbar}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid" style={{ marginLeft: '40px' }}>
                    <Link className="navbar-brand mb-2" to="/">Survey Application</Link>
                    <div style={{ flexGrow: 9 }}></div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Surveys
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/survey">Survey</Link></li>
                                    <li><Link className="dropdown-item" to="/getAllSurvey">GetAllSurvey</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/User">Users</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link active" onClick={handleLogout}>Logout</button>
                            </li>
                            <li className="nav-item">
                                <img src={userImage} alt="User" className="nav-link active" style={{ width: '50px', height: '50px' }} onClick={handleImageClick} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

