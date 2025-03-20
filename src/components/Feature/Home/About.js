import React, { useEffect } from "react";

export function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <section id="about" className="about section my-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3>Transforming Online Education with AI</h3>
            <img
              src="/img/about-2.jpg"
              className="img-fluid rounded-4 mb-4"
              alt="EduQuest AI Learning"
            />
            <p>
              EduQuest leverages artificial intelligence to create adaptive
              learning paths, generate personalized quizzes, and provide
              real-time feedback. Our goal is to revolutionize online education
              by making learning more interactive, engaging, and tailored to
              individual needs.
            </p>
            <p>
              Whether you're a student seeking skill enhancement or an
              instructor looking to manage courses efficiently, EduQuest offers
              powerful tools to streamline the process. With AI-driven
              analytics, we ensure that every learner gets the most relevant and
              effective learning experience.
            </p>
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="250">
            <div className="content ps-0 ps-lg-5">
              <p className="fst-italic">
                Why choose EduQuest? Our platform is designed to bridge the gap
                between traditional learning and modern AI-powered education.
              </p>
              <ul>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>
                    AI-powered course recommendations tailored to each learner’s
                    needs.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>
                    Automated quiz generation based on course content for
                    efficient knowledge retention.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>
                    Real-time analytics and progress tracking to optimize
                    learning outcomes.
                  </span>
                </li>
              </ul>
              <p>
                EduQuest empowers educators and learners by offering smart
                solutions for course management, progress tracking, and
                interactive assessments. Join us in shaping the future of
                education!
              </p>

              <div className="position-relative mt-4">
                <img
                  src="/img/about-2.jpg"
                  className="img-fluid rounded-4"
                  alt="EduQuest Learning"
                />
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="glightbox pulsating-play-btn"
                >
                  {/* <i class="bi bi-play-circle"></i> */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
