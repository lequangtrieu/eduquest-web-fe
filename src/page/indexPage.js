import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

const IndexPage = () => {
  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userId", decodedToken.id);
        history.push("/");
        window.location.reload();
      } catch (error) {
        console.error("Invalid token");
        history.push("/signIn");
        window.location.reload();
      }
    }
  }, [history]);

  return (
    <>
     
    </>
  );
};

export default IndexPage;
