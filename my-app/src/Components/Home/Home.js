import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Card = () => {
    const [surveyDetails, setSurveyDetails] = useState({
        surveyCount: 0,
        questionCount: 0,
        answerCounts: 0,
        userCounts: 0
    });
    const navigate = useNavigate();

    useEffect(() => {

        const fetchSurveyDetails = async () => {
            try {
                const response = await axios.get('http://192.168.1.10:7500/api/survey/getDetailsSurveys');
                console.log('Response:', response.data);
                const { surveyCount, questionCount, answerCounts, userCounts } = response.data;
                setSurveyDetails({ surveyCount, questionCount, answerCounts, userCounts });
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
        };

        fetchSurveyDetails();
    }, []);

    return (
        <div className="card-group" style={{ margin: '30px 10px' }}>
            <div className="card">
                <div className="styled-heading-box" style={{ backgroundColor: 'cadetblue', color: 'white', padding: '10px', borderRadius: '5px' }}>
                    <h5 className="card-title text-center">Total Survey</h5>
                </div>
                <p className="card-text text-center">{surveyDetails.surveyCount}</p>
                <p className="card-text">When you have created a great online survey, you’ll want to generate as strong a response rate as you can, as any meaningful actions you’re able to take will depend on the reliability and quality of your response data.</p>
                <button type="button" onClick={() => navigate('/GetAllSurvey')}>Surveys</button>
            </div>

            <div className="card" style={{ marginLeft: '10px' }}>

                <div className="styled-heading-box" style={{ backgroundColor: 'cadetblue', color: 'white', padding: '10px', borderRadius: '5px' }}>
                    <h5 className="card-title text-center">Total Questions</h5>
                </div>
                <p className="card-text text-center">{surveyDetails.questionCount}</p>

            </div>
            <div className="card" style={{ marginLeft: '10px' }}>

                <div className="styled-heading-box" style={{ backgroundColor: 'cadetblue', color: 'white', padding: '10px', borderRadius: '5px' }}>
                    <h5 className="card-title text-center">Total Answers</h5>
                </div>
                <p className="card-text text-center">{surveyDetails.answerCounts}</p>

            </div>
            <div className="card" style={{ marginLeft: '10px' }}>

                <div className="styled-heading-box" style={{ backgroundColor: 'cadetblue', color: 'white', padding: '10px', borderRadius: '5px' }}>
                    <h5 className="card-title text-center">Total Users</h5>
                </div>
                <p className="card-text text-center">{surveyDetails.userCounts}</p>
            </div>
        </div>
    );
};

export default Card;