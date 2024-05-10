import React from 'react';
import { Link } from 'react-router-dom'; 
import style from './Navbar.module.css';

const Navbar = ({ isLoggedIn }) => {
    return (
        <div className={style.navbar}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Survey Application</Link> 
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Home">Home</Link> 
                            </li>
                            {isLoggedIn ? null : (
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/Login">Login</Link> 
                                </li>
                            )}
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
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;







