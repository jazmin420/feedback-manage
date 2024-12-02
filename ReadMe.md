# Feedback System with Twilio Integration

## Description
This project is a feedback system where customers can leave feedback using emoji ratings. Based on the feedback provided, the system sends notifications to the owner using Twilio if the feedback is positive (Excellent or Good) after admin approval. The project is built using Node.js for the backend, React for the frontend, MongoDB for data storage, and Twilio for SMS notifications.

## Technologies Used
- **Node.js** (Backend)
- **Express.js** (Web Framework)
- **MongoDB** (Database)
- **Twilio** (SMS Service)
- **React** (Frontend)
- **Tailwind CSS** (Styling)
- **Material Tailwind** UI(seemless design)
- **Cookies** (For session management)

## Installation Instructions

### Prerequisites
Before running this project locally, you need to have the following installed:
- **Node.js**
- **MongoDB** (locally or use MongoDB Atlas)
- **Twilio Account** (for sending SMS notifications)

## Ports
    Frontend: http://localhost:5173
    Backend: http://localhost:3000

## Features
- **Feedback Management**: Allows users to submit feedback with an emoji-based rating system with videos, images and invoice.
- **Admin Panel**: Admins can approve or reject feedback.
- **WhatsApp Notification**: Sends a WhatsApp notification to the owner for positive feedback.
- **Authentication**: Secure login/logout system.