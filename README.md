# 📝 Application Form – Stepwise User Details Collection

> A multi-step application form built using **React + Vite** with **HuggingFace AI integration** to assist users while filling out their information.

---

## 🚀 Project Overview

This project allows users to submit their application details in a **step-by-step manner**.

It includes:

- 🌍 Country, State, City integration  
- 🆔 Country-specific National ID validation  
- 👨‍👩‍👧 Family details selection  
- 🤖 AI-powered writing assistance (HuggingFace integration)  
- 🔁 Smart fallback system if AI API fails  

---

## 🛠 Tech Stack

- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- ✅ React Hook Form + Zod
- 🌐 Express.js (Backend)
- 🤖 HuggingFace Inference API

---

# 📦 Installation & Setup

Both **Frontend** and **Backend** must be running for the project to work properly.

---

## 🔹 Step 1: Run Frontend (React + Vite)

Clone the repository and install dependencies in the root folder:

npm install
npm run dev

Frontend will run at: http://localhost:5173/


---

## 🔹 Step 2: Run Backend (Express Server)

Navigate to the `server` folder and install dependencies:

npm install
node server.js

Backend server will start at: http://localhost:5000


---

⚠️ **Important:**  
Both frontend and backend must be running simultaneously.

---

# ✨ Features of the Project

---

## 🧾 Step 1 – Basic User Details

- Collects basic personal information.
- 🌍 Country → State → City integration.
- 🆔 National ID validation based on country standards.
  
Example:
- 🇮🇳 India → Aadhaar validation format.
- Other countries → Different validation logic.

This ensures country-specific data accuracy.

---

## 👨‍👩‍👧 Step 2 – Family Details

- Family information collected using dropdown/select inputs.
- Structured and user-friendly UI.
- Validation included for required fields.

---

## 🤖 Step 3 – AI Assistance (HuggingFace Integration)

- AI helps users draft:
  - Current Financial Situation
  - Employment Circumstances
  - Reason for Applying
- API call is made to HuggingFace model.
- If API fails or is unavailable:
  - 🔁 Fallback suggestions are automatically used.
  - User never gets stuck.

This ensures a smooth and uninterrupted user experience.

---

# 🔐 Environment Variables

Backend requires:
HF_TOKEN=your_huggingface_token


Create a `.env` file inside the `server` folder.