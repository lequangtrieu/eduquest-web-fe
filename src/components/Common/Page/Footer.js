export default function Footer() {
  return (
    <footer id="footer" class="footer accent-background">
      <div class="container footer-top">
        <div class="row gy-4">
          <div class="col-lg-4 col-md-12 footer-about">
            <a href="index.html" class="logo d-flex align-items-center">
              <img
                src="/img/EduQuestLogo.png"
                alt="EduQuest Logo"
                class="footer-logo"
              />
              <span class="sitename">EduQuest</span>
            </a>
            <p class="footer-description">
              Elevate your learning experience with AI-powered courses,
              personalized quizzes, and interactive mentorship programs.
            </p>
            <div class="social-links d-flex mt-3">
              <a href="#">
                <i class="bi bi-twitter-x"></i>
              </a>
              <a href="#">
                <i class="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="#">
                <i class="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          <div class="col-lg-2 col-md-6 footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Courses</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>

          <div class="col-lg-2 col-md-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <a href="#">AI-Powered Learning</a>
              </li>
              <li>
                <a href="#">Automated Quizzes</a>
              </li>
              <li>
                <a href="#">Personalized Feedback</a>
              </li>
              <li>
                <a href="#">Interactive Courses</a>
              </li>
              <li>
                <a href="#">Mentorship Program</a>
              </li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>
              <i class="bi bi-geo-alt-fill"></i> EduQuest HQ, Silicon Valley, CA
            </p>
            <p>
              <i class="bi bi-telephone-fill"></i> +1 800 123 4567
            </p>
            <p>
              <i class="bi bi-envelope-fill"></i> support@eduquest.com
            </p>
            <p>
              <i class="bi bi-clock-fill"></i> Mon - Fri: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>

      <div class="container copyright text-center mt-4">
        <p>
          © 2024 <strong>EduQuest</strong>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
