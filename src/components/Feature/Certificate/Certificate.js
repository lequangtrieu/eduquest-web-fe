import React, { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import PageLayout from "../../Common/Page/PageLayout";

const Certificate = ({
  studentName = "John Doe",
  courseName = "React Development",
  instructorName = "Jane Smith",
  completionDate = new Date().toLocaleDateString(),
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  const certificateRef = useRef();
  const location = useLocation();
  const certificateData = location.state;

  const downloadCertificate = async () => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    const imgWidth = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`Certificate-${certificateData.studentName || studentName}.pdf`);
  };

  const formattedDate = new Date(
    certificateData.completionDate || completionDate
  ).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <PageLayout>
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f8f8f8",
        }}
      >
        <div
          ref={certificateRef}
          style={{
            width: "900px",
            height: "600px",
            padding: "40px",
            margin: "auto",
            border: "15px solid #1c5d99",
            position: "relative",
            fontFamily: "Georgia, serif",
            background: "#fff",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              border: "8px solid #d1d1d1",
              padding: "30px",
              height: "100%",
              position: "relative",
            }}
          >
            <img
              src="/img/EduQuestLogo.png"
              alt="Logo"
              style={{
                width: "130px",
                position: "absolute",
                top: "32px",
                left: "20px",
              }}
            />

            <h1
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                color: "#1c5d99",
                marginBottom: "5px",
                textTransform: "uppercase",
              }}
            >
              Certificate of Achievement
            </h1>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "20px",
                fontStyle: "italic",
                color: "#555",
              }}
            >
              This is proudly awarded to
            </p>

            <h2
              style={{
                fontSize: "34px",
                color: "#000",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {certificateData.studentName || studentName}
            </h2>

            <p
              style={{ fontSize: "18px", marginBottom: "15px", color: "#333" }}
            >
              for successfully completing the course
            </p>

            <h3
              style={{
                fontSize: "28px",
                color: "#1c5d99",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {certificateData.courseName || courseName}
            </h3>

            <p
              style={{
                fontSize: "16px",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              <strong> Awarded on </strong>
              <strong
                style={{
                  verticalAlign: "middle",
                }}
              >
                {formattedDate}
              </strong>
            </p>

            <img
              src="/img/certificate/seal.jpg"
              alt="Seal"
              style={{
                width: "130px",
                position: "absolute",
                bottom: "50px",
                left: "80px",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "50px",
                right: "100px",
                textAlign: "center",
              }}
            >
              <img
                src="/img/certificate/signature.jpg"
                alt="Signature"
                style={{ width: "120px", marginBottom: "-10px" }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  fontFamily: "'Dancing Script', cursive",
                  marginBottom: "2px",
                }}
              >
                {certificateData.instructorName || instructorName}
              </p>
              <p style={{ fontSize: "12px", color: "#333" }}>
                Course Instructor
              </p>
            </div>
            <p
              style={{
                position: "absolute",
                bottom: "10px",
                width: "100%",
                textAlign: "center",
                fontSize: "12px",
                color: "#777",
              }}
            >
              This certificate is issued as recognition of outstanding
              performance and dedication.
            </p>
          </div>
        </div>
        <button
          onClick={downloadCertificate}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#1c5d99",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Download Certificate
        </button>
      </div>
    </PageLayout>
  );
};

export default Certificate;
