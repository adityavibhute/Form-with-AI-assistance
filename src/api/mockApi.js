import axios from "axios";

export const submitApplication = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, message: "Application submitted successfully" });
    }, 1500);
  });
};
