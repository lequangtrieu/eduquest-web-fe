import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Survey() {
  const [formData, setFormData] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
    studyHours: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send to API, update state, etc.)
    console.log(formData);
  };

  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  let question = `
            I have the following weekly availability for studying:

            - Monday: ${formData.monday || "Not specified"}
            - Tuesday: ${formData.tuesday || "Not specified"}
            - Wednesday: ${formData.wednesday || "Not specified"}
            - Thursday: ${formData.thursday || "Not specified"}
            - Friday: ${formData.friday || "Not specified"}
            - Saturday: ${formData.saturday || "Not specified"}
            - Sunday: ${formData.sunday || "Not specified"}

            Additionally, I am willing to study for ${
              formData.studyHours || "0"
            } hours per week.

            Based on this information, please generate a detailed and personalized study schedule that fits my available time slots. The schedule should allocate study sessions, breaks, and revision periods in a balanced manner, and it should be suitable for an online learning app environment.
            Please return the answer to exactly match this form:
            <tr>
                <td><div class="p-2 bg-light border rounded mb-1">hh:mm - hh:mm</div>...</td>
                <td><div class="p-2 bg-light border rounded mb-1">hh:mm - hh:mm</div>...</td>
                <td><div class="p-2 bg-light border rounded mb-1">hh:mm - hh:mm</div>...</td>
                <td><div class="p-2 bg-light border rounded mb-1">hh:mm - hh:mm</div>...</td>
                <td><div class="p-2 bg-light border rounded mb-1">hh:mm - hh:mm</div>...</td>
                <td><div class="p-2 bg-light border rounded mb-1">hh:mm - hh:mm</div>...</td>
                <td><div class="p-2 bg-light border rounded mb-1">hh:mm - hh:mm</div>...</td>
            </tr>
            `;

  const handleRedirect = () => {
    // Navigate to the '/about' page
    navigate("/schedule");
  };

  async function SendMessage() {
    let userId = localStorage.getItem("userId");

    try {
      const response = await axios.post(
        `https://localhost:7091/api/Schedule/create `,
        {
          question: question,
          userId: userId,
        }
      );
      console.log(response);
      handleRedirect();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && localStorage.getItem("role") === "VIP Student") {
      async function fetchData() {
        try {
          const userId = localStorage.getItem("userId");

          const response = await axios.get(
            `https://localhost:7091/api/Schedule/get`,
            {
              params: {
                userId: userId,
              },
            }
          );
          if (!response.data) {
            setShowForm(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    } else {
      setShowForm(false);
    }
  }, []);

  return (
    showForm && (
      <div className="">
        <div
          className="position-absolute bg-black opacity-50 w-100 min-vh-100 "
          style={{ zIndex: 9 }}
        ></div>

        <div
          className="position-absolute start-50 translate-middle-x bg-white rounded"
          style={{ zIndex: 10, padding: "10px", marginTop: "20px" }}
        >
          <form onSubmit={handleSubmit} className="">
            <div className="d-flex justify-content-between w-100">
              <h4 className="mt-4">Weekly Availability Survey</h4>
              <button
                className="btn btn-danger"
                style={{ width: "7%", height: "50%" }}
                onClick={() => {
                  setShowForm(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Weekly Availability */}
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="monday">Monday</label>
                <input
                  type="text"
                  className="form-control"
                  id="monday"
                  name="monday"
                  value={formData.monday}
                  onChange={handleChange}
                  placeholder="Available hours"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="tuesday">Tuesday</label>
                <input
                  type="text"
                  className="form-control"
                  id="tuesday"
                  name="tuesday"
                  value={formData.tuesday}
                  onChange={handleChange}
                  placeholder="Available hours"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="wednesday">Wednesday</label>
                <input
                  type="text"
                  className="form-control"
                  id="wednesday"
                  name="wednesday"
                  value={formData.wednesday}
                  onChange={handleChange}
                  placeholder="Available hours"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="thursday">Thursday</label>
                <input
                  type="text"
                  className="form-control"
                  id="thursday"
                  name="thursday"
                  value={formData.thursday}
                  onChange={handleChange}
                  placeholder="Available hours"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="friday">Friday</label>
                <input
                  type="text"
                  className="form-control"
                  id="friday"
                  name="friday"
                  value={formData.friday}
                  onChange={handleChange}
                  placeholder="Available hours"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="saturday">Saturday</label>
                <input
                  type="text"
                  className="form-control"
                  id="saturday"
                  name="saturday"
                  value={formData.saturday}
                  onChange={handleChange}
                  placeholder="Available hours"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="sunday">Sunday</label>
              <input
                type="text"
                className="form-control"
                id="sunday"
                name="sunday"
                value={formData.sunday}
                onChange={handleChange}
                placeholder="Available hours"
              />
            </div>

            {/* Study Commitment */}
            <div className="form-group mt-4">
              <label htmlFor="studyHours">
                How many hours per week are you willing to study?
              </label>
              <input
                type="number"
                className="form-control"
                id="studyHours"
                name="studyHours"
                value={formData.studyHours}
                onChange={handleChange}
                min="1"
                max="168"
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={SendMessage}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  );
}
