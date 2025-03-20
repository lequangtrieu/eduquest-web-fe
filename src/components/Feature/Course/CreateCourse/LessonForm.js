import React, { useState } from 'react';
import CourseQuestions from './CourseQuestions';
import "../../../../public/assets/css/CreateCouse/create-course-lessons.css";
import { FaPlus, FaTrash, FaChevronDown, FaChevronUp, FaDropbox } from "react-icons/fa";

const LessonForm = ({ modules, setModules, moduleIndex, lessonIndex, quizzes }) => {
  const [isExpanded, setIsExpanded] = useState(true); // Trạng thái rút gọn/mở rộng

  const handleLessonChange = (field, value) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons[lessonIndex][field] = value;
    setModules(updatedModules);
  };

  const handleDeleteLesson = () => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons.splice(lessonIndex, 1);
    setModules(updatedModules);
  };

  return (
    <div className={`lesson-container ${isExpanded ? '' : 'collapsed'}`}>
      {/* Header: Tiêu đề + Nút Remove & Toggle */}
      <div className="lesson-header">
        <span className="lesson-title">
          Lesson {lessonIndex + 1}: {modules[moduleIndex].lessons[lessonIndex].title || "Untitled"}
        </span>
        <div className="lesson-actions">
          <button className="btn btn-danger" onClick={handleDeleteLesson}><FaTrash /> Lesson</button>
          <button className="btn btn-toggle" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Nội dung Lesson */}
      {isExpanded && (
        <div className="lesson-content">
          <div className="mb-3">
            <label className="form-label">Lesson Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Lesson Title"
              value={modules[moduleIndex].lessons[lessonIndex].title}
              onChange={(e) => handleLessonChange('title', e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Video URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter video URL"
              value={modules[moduleIndex].lessons[lessonIndex].videoUrl}
              onChange={(e) => handleLessonChange('videoUrl', e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows={3}
              value={modules[moduleIndex].lessons[lessonIndex].description}
              onChange={(e) => handleLessonChange('description', e.target.value)}
            ></textarea>
          </div>

          {/* Add Quizzes */}
          <CourseQuestions
            modules={modules}
            setModules={setModules}
            quizzes={quizzes}
          />
        </div>
      )}
    </div>
  );
};

export default LessonForm;
