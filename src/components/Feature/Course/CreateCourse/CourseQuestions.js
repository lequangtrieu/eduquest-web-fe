import React, { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";

const CourseQuestions = ({ modules, setModules, quizzes }) => {
    const [newQuestionText, setNewQuestionText] = useState('');
    const [newOptions, setNewOptions] = useState(["", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    const handleAddQuestion = () => {
        if (!newQuestionText.trim() || newOptions.some(opt => opt.trim() === "") || correctAnswer === null) {
            alert("All fields are required.");
            return;
        }

        const newQuestion = {
            questionText: newQuestionText,
            options: [...newOptions],
            correctAnswer
        };

        const updatedModules = [...modules];
        quizzes.push(newQuestion);
        setModules(updatedModules);

        setNewQuestionText('');
        setNewOptions(["", "", "", ""]);
        setCorrectAnswer(null);
    };

    const handleDeleteQuestion = (quizIndex) => {
        const updatedModules = [...modules];
        quizzes.splice(quizIndex, 1);
        setModules(updatedModules);
    };

    return (
        <div className="question-container">
            <h3>Course Questions</h3>
            {/* {quizzes.map((quiz, quizIndex) => (
                <div key={quizIndex} className="quiz-item">
                    <p><strong>{quizIndex + 1}. {quiz.questionText}</strong></p>
                    <ul>
                        {quiz.options.map((option, index) => (
                            <li key={index} className={index === quiz.correctAnswer ? 'correct' : ''}>{option}</li>
                        ))}
                    </ul>
                    <button className="btn btn-danger" onClick={() => handleDeleteQuestion(quizIndex)}>
                        <FaTrash /> Delete
                    </button>
                </div>
            ))} */}

            <div className="question-form">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Question"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                />
                {newOptions.map((option, index) => (
                    <div key={index} className="option-item">
                        <input
                            type="radio"
                            name="correctAnswer"
                            checked={correctAnswer === index}
                            onChange={() => setCorrectAnswer(index)}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => {
                                const updatedOptions = [...newOptions];
                                updatedOptions[index] = e.target.value;
                                setNewOptions(updatedOptions);
                            }}
                        />
                    </div>
                ))}
                <button className="btn btn-primary mt-2" onClick={handleAddQuestion}>
                    <FaPlus /> Add Question
                </button>
            </div>
        </div>
    );
};

export default CourseQuestions;
