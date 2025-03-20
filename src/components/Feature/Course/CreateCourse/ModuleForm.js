import React, { useState } from 'react';
import LessonForm from "../CreateCourse/LessonForm";
import "../../../../public/assets/css/CreateCouse/create-course-module.css";
import { FaPlus, FaTrash, FaChevronDown, FaChevronUp, FaArrowCircleRight } from "react-icons/fa";

const ModuleForm = () => {
    const [newModuleTitle, setNewModuleTitle] = useState('');
    const [modules, setModules] = useState([]);
    const [expandedModules, setExpandedModules] = useState({}); // Trạng thái mở rộng/thu gọn

    const handleDeleteModule = (moduleIndex) => {
        setModules(modules.filter((_, index) => index !== moduleIndex));
    };

    const handleAddModule = () => {
        if (newModuleTitle.trim() === "") {
            alert("Module title is required.");
            return;
        }

        const maxIndex = modules.length > 0
            ? Math.max(...modules.map(module => {
                const match = module.title.match(/^Mooc (\d+)/);
                return match ? parseInt(match[1]) : 0;
            }))
            : 0;

        const newModule = {
            title: `Mooc ${maxIndex + 1} - ${newModuleTitle}`,
            lessons: []
        };

        setModules([...modules, newModule]);
        setNewModuleTitle(""); // Reset input
    };

    const handleAddLesson = (moduleIndex) => {
        const newLesson = {
            title: '',
            videoUrl: '',
            description: '',
            questions: []
        };
        const updatedModules = [...modules];
        updatedModules[moduleIndex].lessons.push(newLesson);
        setModules(updatedModules);
    };

    const toggleExpand = (moduleIndex) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleIndex]: !prev[moduleIndex]
        }));
    };

    return (
        <div className="module-container">
            <div className="module-list">
                {modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="module-item">
                        <div className="module-banner">
                            <span className="module-title"><FaArrowCircleRight className="module-icon mr-1" /> {module.title}</span>
                            <button
                                type="button"
                                className="btn btn-secondary mr-2"
                                onClick={() => handleAddLesson(moduleIndex)}
                            >
                                <FaPlus /> Lesson
                            </button>

                            <button
                                className="btn btn-danger mr-2"
                                onClick={() => handleDeleteModule(moduleIndex)}
                            >
                                <FaTrash /> Mooc
                            </button>

                            <button
                                className="btn btn-toggle"
                                onClick={() => toggleExpand(moduleIndex)}
                            >
                                {expandedModules[moduleIndex] ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                        </div>

                        {expandedModules[moduleIndex] && (
                            <div className="lesson-list mb-2">
                                {module.lessons.map((lesson, lessonIndex) => (
                                    <LessonForm
                                        modules={module}
                                        setModules={setModules}
                                        moduleIndex={moduleIndex}
                                        lessonIndex={lessonIndex}
                                        // quizzes={modules[moduleIndex].lessons[lessonIndex].quizzes}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Module Title"
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                />
                <button type="button" className="btn btn-primary mt-2" onClick={handleAddModule}>
                    Add Module
                </button>
            </div>
        </div>
    );
};

export default ModuleForm;
