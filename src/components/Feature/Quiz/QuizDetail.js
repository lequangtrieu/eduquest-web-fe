import { useParams } from "react-router-dom";
import PageLayout from "../../Common/Page/PageLayout";
import { useState } from "react";
import SweetAlert from "sweetalert";
import axios from "axios";

const questions = [
  {
    id: 1,
    questionText: "React là gì?",
    options: [
      "Ngôn ngữ lập trình",
      "Thư viện JavaScript để xây dựng giao diện người dùng",
      "Framework backend",
      "Công cụ quản lý state",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    questionText: "Bootstrap được sử dụng để làm gì?",
    options: [
      "Kết nối CSDL",
      "Xử lý logic nghiệp vụ",
      "Tạo giao diện responsive",
      "Tối ưu SEO",
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    questionText: "Node.js là gì?",
    options: [
      "Môi trường chạy JavaScript phía server",
      "Thư viện của React",
      "Trình biên dịch Java",
      "Công cụ tạo API tự động",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    questionText: "JavaScript được sử dụng chủ yếu để làm gì?",
    options: [
      "Viết mã backend",
      "Lập trình hệ thống nhúng",
      "Phát triển ứng dụng mobile",
      "Lập trình phía client ",
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    questionText: "Trong React, state là gì?",
    options: [
      "Phương thức để thay đổi props",
      "Một loại biến toàn cục",
      "Cấu trúc dữ liệu trong Redux",
      "Một đối tượng chứa dữ liệu động của component ",
    ],
    correctAnswer: 3,
  },
  {
    id: 6,
    questionText: "CSS Grid được sử dụng để?",
    options: [
      "Quản lý database",
      "Thay thế JavaScript",
      "Xử lý backend",
      "Tạo bố cục trang web linh hoạt ",
    ],
    correctAnswer: 3,
  },
  {
    id: 7,
    questionText: "Thành phần nào của HTTP giúp định danh loại nội dung trả về?",
    options: ["Header", "Body", "Status Code", "Method"],
    correctAnswer: 0,
  },
  {
    id: 8,
    questionText: "Cấu trúc dữ liệu nào được sử dụng trong Redux?",
    options: [
      "Stack",
      "Queue",
      "Store",
      "Graph",
    ],
    correctAnswer: 2,
  },
  {
    id: 9,
    questionText: "Câu lệnh nào dùng để tạo component trong React?",
    options: [
      "new Component()",
      "createComponent()",
      "function Component() {} ",
      "class Component()",
    ],
    correctAnswer: 2,
  },
  {
    id: 10,
    questionText: "API RESTful sử dụng phương thức HTTP nào để cập nhật dữ liệu?",
    options: ["PUT", "GET", "POST", "DELETE"],
    correctAnswer: 0,
  },
];

export default function QuizDetail() {
  const { quizId } = useParams();

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [AIExplain, setAIExplain] = useState("");

  const handleOptionSelect = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, idx) => {
      if (answer === questions[idx].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const unanswered = answers
      .map((answer, idx) => (answer === null ? idx + 1 : null))
      .filter((num) => num !== null);

    if (unanswered.length > 0) {
      SweetAlert(
        "Nộp bài thất bại!",
        `Bạn chưa trả lời các câu sau: ${unanswered.join(
          ", "
        )}. Vui lòng hoàn thành hết các câu hỏi.`,
        "error"
      );
      setSubmitAttempted(true);
      return;
    }
    sendMessage();
    setShowScore(true);
  };

  const handleRestart = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrentQuestion(0);
    setShowScore(false);
    setSubmitAttempted(false);
  };

  const isCurrentUnanswered =
    submitAttempted && answers[currentQuestion] === null;

  async function sendMessage() {
    let question = "I am doing the educate app. I have these question and options for answer:"

    questions.forEach((element, index) => {
      question += (index  + ". " + element.questionText)
      element.options.forEach((option, indexes) => {
        question += "\n" + String.fromCharCode(97 + indexes) + ". " + option
      })
      question += "\n" + ". True answer:" + String.fromCharCode(97 + element.correctAnswer) + "\n"
    });

    question += "The user in my app is answer those: "
    answers.forEach((element, index) => {
      question += (index + 1) + ". " + String.fromCharCode(97 + element) + " "
    })

    question += "Explain why user answer right, and why user answer wrong base on correct answer I have given, each answer is explain in 1 line (20 words) format by: 1. ... 2. ..."

    try {
      const response = await axios.get(
        `https://eduquest-web-bqcrf6dpejacgnga.southeastasia-01.azurewebsites.net/api/ChatGPTTest/get-answer`,
        {
          params: {
            question: question
          }
        }
      );

    setAIExplain(response.data.answer)
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <PageLayout>
      <div
        className="container mt-5 my-4"
        style={{
          height: "500px",
        }}
      >
        <div
          className="card shadow"
          style={{
            maxHeight: "500px",
          }}
        >
          <div className="card-header">
            <h3 className="mb-0">Quiz Test</h3>
          </div>
          <div className="card-body" style={{ height: "400px" }}>
            {showScore ? (
              <div className="text-center">
                <h4>Bạn đã hoàn thành quiz!</h4>
                <p>
                  Điểm của bạn: {calculateScore()} / {questions.length}
                </p>
                <div>{AIExplain}</div>
                <button className="btn btn-primary" onClick={handleRestart}>
                  Làm lại quiz
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h5 className={isCurrentUnanswered ? "text-danger" : ""}>
                    Câu hỏi {currentQuestion + 1}/{questions.length}
                  </h5>
                  <p className={isCurrentUnanswered ? "text-danger" : ""}>
                    {questions[currentQuestion].questionText}
                  </p>
                </div>
                <div
                  className="list-group"
                  style={{
                    maxHeight: "200px",
                    height: "200px",
                    overflow: "auto",
                  }}
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`list-group-item list-group-item-action ${
                        answers[currentQuestion] === index ? "active" : ""
                      }`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="mt-4 d-flex justify-content-between">
                  <button
                    className="btn btn-secondary"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    Câu trước
                  </button>
                  <div>
                    <button
                      className="btn btn-success me-2"
                      onClick={handleNext}
                      disabled={currentQuestion === questions.length - 1}
                    >
                      Câu tiếp theo
                    </button>
                    <button className="btn btn-warning" onClick={handleSubmit}>
                      Nộp bài
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
