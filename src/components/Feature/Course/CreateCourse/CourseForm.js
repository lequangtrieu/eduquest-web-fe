import React, { useState } from 'react';
import { DollarSign, Image, Tag } from 'lucide-react';
import "../../../../public/assets/css/CreateCouse/create-course-form.css";

const CourseForm = ({ }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([
      { id: 1, name: "Programming" },
      { id: 2, name: "Web Development" },
      { id: 3, name: "Data Science" },
      { id: 4, name: "Machine Learning" },
      { id: 5, name: "Artificial Intelligence" },
      { id: 6, name: "Cloud Computing" },
      { id: 7, name: "Cybersecurity" },
      { id: 8, name: "Mobile Development" },
      { id: 9, name: "Database Management" },
      { id: 10, name: "DevOps" },
      { id: 11, name: "Software Engineering" },
      { id: 12, name: "Blockchain" },
      { id: 13, name: "Internet of Things (IoT)" },
      { id: 14, name: "UI/UX Design" },
      { id: 15, name: "Game Development" },
      { id: 16, name: "Networking" },
      { id: 17, name: "Business Intelligence" },
      { id: 18, name: "Virtual Reality (VR)" },
      { id: 19, name: "Augmented Reality (AR)" },
      { id: 20, name: "IT Project Management" },
      { id: 21, name: "Agile & Scrum" }
    ]);
  
  return (
    <div className="course-form">
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <label className="form-label">Course Title*</label>
          <input
            type="text"
            className={`form-control ${errors.courseTitle ? 'is-invalid' : ''}`}
            placeholder="Enter course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
          {errors.courseTitle && <div className="invalid-feedback">{errors.courseTitle}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label"><Tag className="me-1" size={16} />Category</label>
          <select className="form-select" value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Description */}
      <div className="mb-4">
        <label className="form-label">Description*</label>
        <textarea
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          rows={4}
          placeholder="Enter course description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>

      {/* Price and Image URL */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <label className="form-label"><DollarSign className="me-1" size={16} />Price*</label>
          <input
            type="number"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min="0"
            step="0.01"
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

        <div className="col-md-6 mb-3 mb-md-0">
          <label className="form-label"><Image className="me-1" size={16} />Course Image URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {imageUrl && (
            <div className="mt-2 bg-light rounded overflow-hidden" style={{ height: "160px" }}>
              <img
                src={imageUrl}
                alt="Course preview"
                className="w-100 h-100 object-fit-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                }}
              />
            </div>
          )}
        </div>
      </div>     
    </div>
  );
};

export default CourseForm;
