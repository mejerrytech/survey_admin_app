import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import style from './Navbar.module.css'; // Ensure correct path

const userImage = 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1715774216~exp=1715774816~hmac=29e72da2776e077a0a47d7eb8201a6fc79d6fe1c19df9b22e6b0a1d7ff928a3f';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            localStorage.clear();
            Swal.fire({
                icon: 'success',
                title: 'Logout successful',
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/Login');
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
                timer: 4000,
                showConfirmButton: false,
                position: 'top-center'
            });
        }
    };

    const handleChangePassword = async () => {
        try {
            const { value: formValues } = await Swal.fire({
                title: 'Change Password',
                html:
                    '<input id="old-password" class="swal2-input" type="password" placeholder="Old Password">' +
                    '<input id="new-password" class="swal2-input" type="password" placeholder="New Password">',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Change Password',
                cancelButtonText: 'Cancel',
                preConfirm: () => {
                    const oldPassword = document.getElementById('old-password').value;
                    const newPassword = document.getElementById('new-password').value;
                    if (!oldPassword || !newPassword) {
                        Swal.showValidationMessage('Please enter both old and new passwords');
                        return false;
                    }
                    return { oldPassword, newPassword };
                }
            });
            
            if (formValues) {
                console.log(formValues);
            }
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message || 'Failed to change password!',
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

            if (!response.data) {
                throw new Error('User data not found in response');
            }

            const { name, email } = response.data;
            console.log(response.data);

            Swal.fire({
                title: 'User Information',
                html: `<p>Name: ${name}</p><p>Email: ${email}</p>`,
                showCloseButton: true,
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: 'Change Password',
                cancelButtonColor: '#d33',
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    handleChangePassword();
                }
            });
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
                                <img src={userImage} alt="User" className="nav-link active" style={{ width: '50px', height: '50px', cursor: 'pointer' }} onClick={handleImageClick} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;


