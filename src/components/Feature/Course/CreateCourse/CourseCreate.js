import React, { useState } from 'react';
import axios from 'axios';
import CourseHeader from '../CreateCourse/CourseHeader';
import CourseForm from '../CreateCourse/CourseForm';
import PageLayout from "../../../Common/Page/PageLayout";
import "../../../../public/assets/css/CreateCouse/create-course.css";

const CourseCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lessons, setLessons] = useState([]);
  
  // State cho bài học video hoặc quiz
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

  // Handle gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const courseData = {
        title: 'Your Course Title',
        lessons: lessons
      };

      const response = await axios.post("https://your-api-endpoint.com/courses", courseData);
      if (response.status === 200 || response.status === 201) {
        alert("Course created successfully!");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course. Please try again.");
    } finally {
      setIsSubmitting(false);
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
              <div className="form-group">
                <label htmlFor="lessonTitle">Lesson Title</label>
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
                <label htmlFor="lessonType">Lesson Type</label>
                <select
                  className="form-control"
                  id="lessonType"
                  value={lessonType}
                  onChange={(e) => setLessonType(e.target.value)}
                >
                  <option value="video">Video</option>
                  <option value="quiz">Quiz</option>
                </select>
              </div>

              {/* Nếu bài học là video, nhập URL video */}
              {lessonType === 'video' && (
                <div className="form-group">
                  <label htmlFor="videoUrl">Video URL</label>
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
                    <label htmlFor="questionText">Question Text</label>
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
                    <ul>
                      {quizQuestions.map((question, index) => (
                        <li key={index}>
                          <strong>{question.text}</strong>
                          <ul>
                            {question.answers.map((answer, ansIndex) => (
                              <li key={ansIndex}>
                                {answer.text} {answer.isCorrect && "(Correct)"}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
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

              {/* Hiển thị danh sách các bài học */}
              <div className="pt-3">
                <h5>Lessons:</h5>
                <ul>
                  {lessons.map((lesson, index) => (
                    <li key={index}>
                      <strong>{lesson.title}</strong> ({lesson.type})
                      <ul>
                        {lesson.type === 'quiz' && lesson.content.map((question, qIndex) => (
                          <li key={qIndex}>
                            <strong>{question.text}</strong>
                            <ul>
                              {question.answers.map((answer, ansIndex) => (
                                <li key={ansIndex}>
                                  {answer.text} {answer.isCorrect && "(Correct)"}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
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
