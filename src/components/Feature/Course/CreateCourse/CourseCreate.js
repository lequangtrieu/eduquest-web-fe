import React, { useState } from 'react';
import axios from 'axios';
import CourseHeader from '../CreateCourse/CourseHeader';
import CourseForm from '../CreateCourse/CourseForm';
import PageLayout from "../../../Common/Page/PageLayout";
import "../../../../public/assets/css/CreateCouse/create-course.css";
import Swal from 'sweetalert2';  // Import SweetAlert2

const CourseCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lessons, setLessons] = useState([]);

  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonType, setLessonType] = useState('video'); // video or quiz
  const [videoUrl, setVideoUrl] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);

  // State cho câu hỏi quiz
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState([{ text: '', isCorrect: false }]);

  // Handle thêm câu hỏi vào quiz
  const handleAddAnswer = () => {
    setAnswers([...answers, { text: '', isCorrect: false }]);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].text = value;
    setAnswers(newAnswers);
  };

  const handleAnswerCorrectChange = (index) => {
    const newAnswers = [...answers];
    newAnswers[index].isCorrect = !newAnswers[index].isCorrect;
    setAnswers(newAnswers);
  };


  // Handle Remove lesson
  const handleRemoveLesson = (index) => {
    const updatedLessons = lessons.filter((lesson, i) => i !== index);
    setLessons(updatedLessons);
    console.log('Lesson removed');
  };

  const handleEditLesson = (index) => {

  };

  const handleAddQuestion = () => {
    if (!questionText) {
      alert('Question text is required');
      return;
    }
    const newQuestion = {
      text: questionText,
      answers: answers
    };
    setQuizQuestions([...quizQuestions, newQuestion]);
    setQuestionText('');
    setAnswers([{ text: '', isCorrect: false }]);
  };

  // Handle thêm bài học
  const handleAddLesson = () => {
    if (lessonType === 'video' && !videoUrl) {
      alert('Video URL is required for video lesson');
      return;
    }

    const newLesson = {
      title: lessonTitle,
      type: lessonType,
      content: lessonType === 'video' ? videoUrl : quizQuestions
    };

    setLessons([...lessons, newLesson]);
    setLessonTitle('');
    setLessonType('video');
    setVideoUrl('');
    setQuizQuestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Giả lập API call
      setTimeout(() => {
        setIsSubmitting(false);
        Swal.fire({
          title: 'Course Created Successfully!',
          text: 'Your course has been created successfully. You will be redirected to the home page.',
          icon: 'success',
          confirmButtonText: 'Go to Home',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/"; 
          }
        });
      }, 2000); 
    } catch (error) {
      setIsSubmitting(false);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while creating the course.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };


  return (
    <PageLayout>
      <div className="container py-5">
        <div className="card shadow">
          <CourseHeader />
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <CourseForm />

              {/* Nhập thông tin bài học */}
              <div className="lesson-form-container">
                <div className="form-group">
                  <label htmlFor="lessonTitle" className="form-label">Lesson Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lessonTitle"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="Enter lesson title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lessonType" className="form-label">Lesson Type</label>
                  <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="lessonTypeDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {lessonType === 'video' ? 'Video' : 'Quiz'}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="lessonTypeDropdown">
                      <a className="dropdown-item" href="#" onClick={() => setLessonType('video')}>Video</a>
                      <a className="dropdown-item" href="#" onClick={() => setLessonType('quiz')}>Quiz</a>
                    </div>
                  </div>
                </div>

                {/* Nếu bài học là video, nhập URL video */}
                {lessonType === 'video' && (
                  <div className="form-group">
                    <label htmlFor="videoUrl" className="form-label">Video URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="videoUrl"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Enter video URL"
                    />
                  </div>
                )}

                {/* Nếu bài học là quiz, nhập câu hỏi và câu trả lời */}
                {lessonType === 'quiz' && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="questionText" className="form-label">Question Text</label>
                      <input
                        type="text"
                        className="form-control"
                        id="questionText"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="Enter question text"
                      />
                    </div>

                    <div className="form-group">
                      <label>Answers</label>
                      {answers.map((answer, index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                          <input
                            type="text"
                            className="form-control mr-2"
                            value={answer.text}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            placeholder="Enter answer text"
                          />
                          <input
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={() => handleAnswerCorrectChange(index)}
                          /> Correct
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleAddAnswer}
                      >
                        Add Answer
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddQuestion}
                    >
                      Add Question
                    </button>

                    <div className="pt-3">
                      <h5>Questions:</h5>
                      <div className="questions-container">
                        <ul>
                          {quizQuestions.map((question, index) => (
                            <li key={index} className="question-item">
                              <div className="question-text">
                                <strong>{question.text}</strong>
                              </div>
                              <ul className="answer-list">
                                {question.answers.map((answer, ansIndex) => (
                                  <li key={ansIndex} className="answer-item">
                                    {answer.text} {answer.isCorrect && <span className="correct-tag">(Correct)</span>}
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nút thêm bài học vào khóa học */}
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAddLesson}
                >
                  Add Lesson
                </button>
              </div>

              {/* Hiển thị danh sách các bài học */}
              <div className="pt-3">
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Lesson Title</th>
                        <th>Lesson Type</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lessons.map((lesson, index) => (
                        <tr key={index}>
                          <td>{lesson.title}</td>
                          <td>
                            <span className="lesson-type">{lesson.type === 'video' ? 'Video' : 'Quiz'}</span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-remove"
                                onClick={() => handleRemoveLesson(index)}
                              >
                                <i className="fas fa-trash"></i> Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="d-flex justify-content-between pt-3 border-top">
                <button type="submit" className="btn btn-success d-flex align-items-center" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CourseCreate;
