import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "../../Common/Page/PageLayout";
import { FaPlayCircle } from "react-icons/fa";
import "../../../public/assets/css/LearnCourse.css";

export default function LearnCourse() {
    const navigate = useNavigate();
    const { idCourse } = useParams();
    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [activeVideoId, setActiveVideoId] = useState(null);

    // Fetch dữ liệu khóa học & video
    const fetchCourseData = async () => {
        try {
            const result = await axios.get(`https://localhost:7091/api/Course/${idCourse}`);
            setCourse(result.data);

            const mockVideos = [
                { id: 1, title: "Introduction to AI", url: "https://www.youtube.com/embed/x0fSBAgBrOQ" },
                { id: 2, title: "Machine Learning Basics", url: "https://www.youtube.com/embed/30sMCciFIAM" },
                { id: 3, title: "Deep Learning Overview", url: "https://www.youtube.com/embed/9QeNLypIiZs" },
                { id: 4, title: "Data Science 101", url: "https://www.youtube.com/embed/Nno-r1Cz_-I" },
                { id: 5, title: "Natural Language Processing", url: "https://www.youtube.com/embed/WB6FQdp41hs" }
            ];

            setVideos(mockVideos);
            setCurrentVideo(mockVideos[0]);
            setActiveVideoId(mockVideos[0].id);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCourseData();
    }, [idCourse]);

    const handleVideoSelect = (video) => {
        setCurrentVideo(video);
        setActiveVideoId(video.id);
    };

    if (!course) return <PageLayout>Loading...</PageLayout>;

    return (
        <PageLayout>
            <div className="learn-course">
                <div className="container">
                    <h2>{course.courseTitle}</h2>
                    <p>{course.description}</p>

                    <div className="row">
                        <div className="col-lg-3">
                            <div className="sidebar">
                                <h4>Table of Contents</h4>
                                <ul className="list-unstyled">
                                    {videos.map((video) => (
                                        <li key={video.id} className={`content-item ${activeVideoId === video.id ? "active" : ""}`}>
                                            <button onClick={() => handleVideoSelect(video)}>
                                                <FaPlayCircle /> {video.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <button className="btn btn-quiz" onClick={() => navigate(`/quiz/${idCourse}`)}>
                                    Take Quiz
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            {currentVideo && (
                                <div className="video-section">
                                    <h3>{currentVideo.title}</h3>
                                    <iframe
                                        key={currentVideo.id}
                                        src={currentVideo.url}
                                        title={currentVideo.title}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
