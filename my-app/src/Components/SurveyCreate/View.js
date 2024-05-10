import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";
import '../SurveyCreate/View.module.css'

function ViewSurvey() {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const surveyKey = queryParams.get("surveyKey");


    useEffect(() => {
        if (surveyKey) {
            getSurvey();
        }
    }, [surveyKey]);

    const getSurvey = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in local storage');
            }
            const response = await axios.get(`http://192.168.1.10:7500/api/survey/getsurvey?surveyKey=${surveyKey}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSurveys([response.data]);
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Survey fetched successfully',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error:', error.message);
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
                timer: 4000,
                position: 'top-center'
            });
        }
    };

    return (
        <div className="table-container">
            <h1>Surveys</h1>
            {loading ? (
                <p>Loading...</p>
            ) : surveys && surveys.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Survey Key</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Questions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map((survey) => (
                            <tr key={survey.surveyKey}>
                                <td>{survey.surveyKey}</td>
                                <td>{survey.surveyName}</td>
                                <td>{survey.surveyType}</td>
                                <td>{survey.status}</td>
                                <td>
                                    <ul>
                                        {survey.questions.map((question) => (
                                            <li key={question.id}>
                                                <p>{question.questionName}</p>
                                                <ul>
                                                    {question.answers.map((answer) => (
                                                        <li key={answer.id}>{answer.answer}</li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No surveys available</p>
            )}
        </div>
    );
}

export default ViewSurvey;

    