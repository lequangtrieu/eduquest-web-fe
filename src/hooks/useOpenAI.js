import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const useOpenAI = () => {
  const deleteUser = async (theQuestion) => {
    try {
      const response = await axios.get(
        `https://localhost:7091/api/ChatGPTTest/Login`,
        {
          question: theQuestion
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { deleteUser };
};

export default useOpenAI;