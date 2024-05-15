import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";
import '../SurveyCreate/View.module.css'
import { Accordion, AccordionItem } from 'react-bootstrap';


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
            const response = await axios.get(`http://192.168.1.7:7500/api/survey/getsurvey?surveyKey=${surveyKey}`, {
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
            <h1 style={{ marginLeft: '20px' }} >Surveys</h1>
            {loading ? (
                <p style={{ marginLeft: '20px' }}>Loading...</p>
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
                                <td className="align-top">{survey.surveyKey}</td>
                                <td className="align-top">{survey.surveyName}</td>
                                <td className="align-top">{survey.surveyType}</td>
                                <td className="align-top">{survey.status}</td>
                                <td>
                                    <Accordion>
                                        {survey.questions.map((question) => (
                                            <AccordionItem key={question.id} eventKey={question.id}>
                                                <Accordion.Header>{question.questionName}</Accordion.Header>
                                                <Accordion.Body>
                                                    <ul>
                                                        {question.answers.map((answer) => (
                                                            <li key={answer.id}>{answer.answer}</li>
                                                        ))}
                                                    </ul>
                                                </Accordion.Body>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
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



