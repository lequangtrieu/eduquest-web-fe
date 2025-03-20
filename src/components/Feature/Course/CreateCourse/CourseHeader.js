// src/components/CourseHeader.js
import React from 'react';
import { BookOpen } from 'lucide-react';
import "../../../../public/assets/css/CreateCouse/create-course-header.css"; // Đảm bảo import đúng đường dẫn

const CourseHeader = () => {
  return (
    <div className="course-header">
      <h1 className="d-flex align-items-center">
        <BookOpen className="me-2" size={30} />
        Create New Course
      </h1>
      <p className="mt-2 text-light">
        Discover the power of learning by creating your own course!<br></br>
        Fill in the details below to get started and share your knowledge with others.
      </p>
    </div>
  );
};

export default CourseHeader;
