import axios from "axios";
import React, {useState} from "react";

export default function Chatbot() {
      const [listMessage, setListMessage] = useState([])
      const [question, setQuestion] = useState()
      const [isMessageBox, setIsMessageBox] = useState(false)
    
      async function sendMessage() {
        setListMessage((prevList) => [...prevList, [{role: "User"}, {message: question}]])
        console.log(listMessage)
        try {
          const response = await axios.get(
            `https://localhost:7091/api/ChatGPTTest/get-answer`,
            {
              params: {
                question: question 
              }
            }
          );
    
          setListMessage((prevList) => [...prevList, [{role: "Bot"}, {message: response.data.answer}]])
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    
      // var listMessage = [
      //   [{role: "User"}, {message: "Hello"}],
      //   [{role: "Bot"}, {message: "Hello aksfhalkdsfhalksdfhalkdjfhlakdfhaldkfjhasldkfakldsfhakljdsfhkl"}],
      // ]
    return (
        <div>
        <button
          hidden={isMessageBox}

          style={{
            width: "10vh",
            height: "10vh",
            backgroundColor: "#08746c",
            position: "fixed",
            bottom: 20,
            right: 20,
            borderRadius: "9999px",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            border: "none",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={() => {setIsMessageBox(true)}}
          >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3" style={{width: "5vh", height: "5vh", color: "white"}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
        </button>

        <div
          hidden={!isMessageBox}

          style={{
            width: "25vw",
            height: "50vh",
            backgroundColor: "white",
            position: "fixed",
            bottom: 0,
            right: 20,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              height: "10%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            <div style={{ height: "90%" }}>
              <img
                src="/img/openAIAvatar.png"
                alt="Avatar"
                style={{ height: "100%" }}
              />
            </div>
            <div style={{ height: "100%" }}>
              <button style={{ height: "100%", backgroundColor: "white", border: "none" }}
                onClick={() => {setIsMessageBox(false)}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  style={{ height: "100%"}}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{ height: "80%", overflowY: "auto", padding: "10px" }}>
            {listMessage.length > 0 || listMessage != null ? listMessage.map((messagePair, index) => {
              // Destructure the role and message objects from each pair
              const [roleObj, messageObj] = messagePair;
              const isUser = roleObj.role === "User";
              return (
                <div
                  key={index}
                  style={{
                    textAlign: isUser ? "right" : "left",
                    margin: "5px 0",
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: isUser ? "#DCF8C6" : "#EDEDED",
                    maxWidth: "80%",
                    alignSelf: isUser ? "flex-end" : "flex-start",
                    wordWrap: "break-word"
                  }}
                >
                  {messageObj.message}
                </div>
              );
            }) : ""}
          </div>

          {/* Input Area */}
          <div
            style={{
              width: "100%",
              height: "10%",
              display: "flex",
              borderTop: "1px solid #ccc",
            }}
          >
            <input
              placeholder="Enter message"
              onChange={(e) => {setQuestion(e.target.value); console.log(question)}}
              style={{
                width: "90%",
                height: "100%",
                border: "none",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
                paddingLeft: "10px",
              }}
            />
            <button
              style={{
                width: "10%",
                height: "100%",
                border: "none",
                backgroundColor: "transparent",
              }}
              onClick={sendMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                style={{ height: "100%" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        </div>
    )
}