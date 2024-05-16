import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import style from '../SurveyCreate/GetSurvey.module.css';
import { useParams } from 'react-router-dom';

function SurveyGetForm() {
    const [loading, setLoading] = useState(false);
    const [surveys, setSurveys] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [dropdownOpen, setDropdownOpen] = useState([]);

    useEffect(() => {
        getSurveys();
    }, [id]);

    const getSurveys = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://192.168.1.7:7500/api/survey/getallsurvey');
            setSurveys(response.data.surveys);
            setDropdownOpen(new Array(response.data.surveys.length).fill(false));
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Surveys fetched successfully',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error:', error.response ? error.response.data.error : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.error : error.message,
                timer: 4000,
                position: 'top-center'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleViewSurvey = (surveyKey) => {
        navigate(`/view/?surveyKey=${surveyKey}`);
    };

    const handleStatusChange = async (id, newStatus, index) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in local storage');
            }
            const response = await axios.put(`http://192.168.1.7:7500/api/survey/updatesurvey/${id}`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Response:', response.data);
            const updatedSurveys = [...surveys];
            updatedSurveys[index].status = newStatus;
            setSurveys(updatedSurveys);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Successfully updated',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error:', error.response ? error.response.data.error : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.error : error.message,
                timer: 4000,
                position: 'top-center'
            });
        }
    };

    return (
        <div className={style.getSurvey}>
            <div className="table-container">
                <h1 style={{ marginLeft: '20px' }}>Surveys</h1>
                {loading ? (
                    <p style={{ marginLeft: '20px' }}>Loading...</p>
                ) : (
                    surveys.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Survey Key</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Number of Questions</th>
                                    <th>Actions</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {surveys.map((survey, index) => (
                                    <tr key={survey.surveyKey}>
                                        <td>{survey.surveyKey}</td>
                                        <td>{survey.surveyName}</td>
                                        <td>{survey.surveyType}</td>
                                        <td>{survey.status}</td>
                                        <td>{survey.questions.length}</td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="dropbtn" onClick={() => {
                                                    const newDropdownOpen = [...dropdownOpen];
                                                    newDropdownOpen[index] = !newDropdownOpen[index];
                                                    setDropdownOpen(newDropdownOpen);
                                                }}>...</button>
                                                {dropdownOpen[index] && (
                                                    <ul className="dropdown-content">
                                                        <li onClick={() => handleStatusChange(survey.id, 'active', index)}>active</li>
                                                        <li onClick={() => handleStatusChange(survey.id, 'deleted', index)}>deleted</li>
                                                    </ul>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <button onClick={() => handleViewSurvey(survey.surveyKey)}>View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
        </div>
    );
}

export default SurveyGetForm;

