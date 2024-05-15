import React, { useState } from 'react';
import Surveystyle from './Survey.module.css';
import axios from "axios";
import Swal from 'sweetalert2';

function SurveyForm() {
    const [surveyName, setSurveyName] = useState('');
    const [surveyType, setSurveyType] = useState('');
    const [questions, setQuestions] = useState([{ questionName: '', questionType: 'multiple_choice', dropdownOpen: false }]);
    const [options, setOptions] = useState([['', '', '', '']]);

    const handleSurveyNameChange = (event) => {
        setSurveyName(event.target.value);
    };

    const handleSurveyTypeChange = (event) => {
        setSurveyType(event.target.value);
    };

    const handleAddQuestionsToggle = () => {
        setQuestions([...questions, { questionName: '', questionType: 'multiple_choice', dropdownOpen: false }]);
        setOptions([...options, ['', '', '', '']]);
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (index, optionIndex, value) => {
        const newOptions = [...options];
        newOptions[index][optionIndex] = value;
        setOptions(newOptions);
    };

    const handleDeleteQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);

        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };
    
    const handleQuestionTypeChange = (index, type) => {
        handleQuestionChange(index, 'questionType', type);
        if (type === 'multiple_choice') {
            const newOptions = [...options];
            newOptions[index] = ['', '', '', ''];
            setOptions(newOptions);
        }
    };

    const toggleDropdown = (index) => {
        const newQuestions = [...questions];
        newQuestions[index].dropdownOpen = !newQuestions[index].dropdownOpen;
        setQuestions(newQuestions);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in local storage');
                return;
            }
            const surveyData = {
                surveyName: surveyName,
                surveyType: surveyType,
                questions: questions,
            };
            const response = await axios.post('http://192.168.1.7:7500/api/survey/createsurvey', surveyData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Response:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Create survey successfully',
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
    };

    const button = {
        backgroundcolor: "#114271",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderradius: "10px",
        cursor: "pointer",
    }

    return (
        <div className={Surveystyle.container}>
            <h1>Create Survey</h1>
            <form onSubmit={(event) => event.preventDefault()}>
                <div className="mb-3">
                    <label>Survey Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={surveyName}
                        onChange={handleSurveyNameChange}
                        placeholder="Enter your Survey Name"
                    />
                </div>
                <div className="mb-3">
                    <label>Survey Type:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={surveyType}
                        onChange={handleSurveyTypeChange}
                        placeholder="Enter your Survey Type"
                    />
                </div>
            </form>
            <button className="btn btn-primary" onClick={handleAddQuestionsToggle}>Add Questions</button>
            {questions.map((question, index) => (
                <div key={index} className={`p-3 border mb-3 ${Surveystyle.questionBox}`}>
                    <form onSubmit={(event) => event.preventDefault()}>
                        <div className="mb-3">
                            <label>Question Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={question.questionName}
                                onChange={(event) => handleQuestionChange(index, 'questionName', event.target.value)}
                                placeholder="Enter your Question Name"
                            />
                        </div>
                        {question.questionType === 'multiple_choice' && options[index].map((option, optionIndex) => (
                            <input
                                key={optionIndex}
                                type="text"
                                className="form-control mb-2"
                                value={option}
                                onChange={(event) => {
                                    if (question.questionType === 'multiple_choice') {
                                        handleOptionChange(index, optionIndex, event.target.value);
                                    }
                                }}
                                placeholder={`Option ${optionIndex + 1}`}
                            />
                        ))}

                    </form>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" onClick={() => toggleDropdown(index)} id={`dropdownMenu${index}`}>
                            Question Type
                        </button>
                        <div className={`dropdown-menu ${question.dropdownOpen ? 'show' : ''}`} aria-labelledby={`dropdownMenu${index}`}>
                            <button type="button" className="dropdown-item" onClick={() => handleQuestionTypeChange(index, 'objective')}>
                                Objective Question
                            </button>
                            <button type="button" className="dropdown-item" onClick={() => handleQuestionTypeChange(index, 'multiple_choice')}>
                                Multiple Choice Question
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-danger"
                        style={{ backgroundColor: "#114271", color: "white", padding: "10px 20px", border: "none", borderRadius:     "10px", cursor: "pointer", marginLeft: '10px' }}
                        onClick={() => handleDeleteQuestion(index)}
                    >
                        Delete
                    </button>                </div>
            ))}
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit Survey</button>
        </div>
    );
}

export default SurveyForm;