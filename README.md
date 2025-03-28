AI Traffic Violation Detector

Overview

The **AI Traffic Violation Detector** is an innovative web application designed to leverage advanced computer vision techniques for identifying and addressing traffic rule violations. The system integrates **YOLOv5**, a cutting-edge object detection model, with **TensorFlow.js** to enable real-time processing of uploaded images.

Features

- **Traffic Violation Detection**: Identifies violations like riding without a helmet, signal jumping, and unauthorized lane usage.
- **Real-Time Image Processing**: Utilizes YOLOv5 and TensorFlow.js for instant violation detection.
- **User Authentication**: Secure login and signup processes.
- **Violation Reports**: Displays detailed results for detected violations.
- **Profile Management**: Users can update and manage their personal details.
- **Feedback Submission**: Allows users to share feedback on system performance.
- **Notifications**: Provides alerts regarding detected violations and updates.
- **Inquiry Handling**: Enables users to contact support for inquiries.

Tech Stack

Frontend:

- React.js
- Redux (for state management)
- Tailwind CSS

Backend:

- Node.js
- Express.js
- MongoDB (for storing violations and user data)

AI Model:

- YOLOv5 (for object detection)
- TensorFlow.js (for real-time processing in the browser)

Installation & Setup
Prerequisites:
- Node.js installed
- 
- MongoDB setup
- Python (for running YOLOv5 model)

Steps:

1. **Clone the repository:**
   ```sh
  
2. **Install dependencies:**
   ```sh
   npm install
   cd backend && npm install
   ```
3. **Start the backend server:**
   ```sh
   cd backend
   node server.js
   npm start
   ```
4. **Start the frontend application:**
   ```sh
   cd ../frontend
   npm run dev
   ```


Usage

1. **Sign up or log in** to the system.
2. **View detected violations** with detailed results.
3. **Manage profile, submit feedback**, and receive **notifications**.






