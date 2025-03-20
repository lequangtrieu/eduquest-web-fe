import React from "react";
import {Link} from "react-router-dom";

export function Banner() {
    return (
        <>
            <section id="hero" className="hero section accent-background">
                <div
                    className="container position-relative"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div className="row gy-5 justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h2>
                                <span>Welcome to </span>
                                <span id="accent">EduQuest</span>
                            </h2>
                            <p>
                                Building an intelligent online learning platform that
                                incorporates AI technology to personalize the learning
                                experience. Designed to help teachers and trainers upload and
                                manage their lectures, it also creates solutions to help
                                students learn more effectively through automation features
                                such as creating quizzes based on course content and feedback
                                to improve learning performance.
                            </p>
                            <div className="d-flex">
                                <Link to="/courses" className="btn-get-started">
                                    Get Started
                                </Link>
                                <a
                                    href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                                    className="glightbox btn-watch-video d-flex align-items-center"
                                >
                                    <i className="bi bi-play-circle"></i>
                                    <span>Watch Video</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-5 order-1 order-lg-2">
                            <img
                                src="assets/img/hero-img.svg"
                                className="img-fluid"
                                alt=""
                            ></img>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}