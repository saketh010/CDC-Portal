# 🎓 Career Development Cell - Job Application Portal

A modern, full-stack job application portal built with Next.js, designed to streamline the campus recruitment process. This platform connects students with opportunities and helps administrators manage the recruitment workflow efficiently.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)

## ✨ Features

### For Students
- **Job Discovery**
  - Browse through available job listings
  - Filter jobs by status (Open/All)
  - View detailed job descriptions and requirements
  - Job status updates

- **Application Management**
  - View application history
  - Receive email notifications for applications
  - Easy application submission process

- **Profile Management**
  - Create and update personal profile
  - Upload and manage documents
  - View application history

### For Administrators
- **Job Management**
  - Create and publish new job listings
  - Toggle job status (Open/Closed)
  - Manage application deadlines

### Technical Features
- **Authentication & Authorization**
  - Secure user authentication
  - Role-based access control
  - Password recovery system
  - Session management

- **Email Notifications**
  - Application confirmation emails
  - Password change / Forgot password OTP verification
  - Custom email templates

- **Responsive Design**
  - Mobile-first approach
  - Cross-browser compatibility
  - Modern UI/UX
  - Accessible interface

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Docker and Docker Compose (for containerized deployment)
- SMTP server access (for email notifications)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/CDC-Portal.git
   cd CDC-Portal
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/cdc_portal
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   JWT_SECRET=your_jwt_secret
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Development Mode**
   ```bash
   npm run dev
   ```

5. **Production Build**
   ```bash
   npm run build
   npm start
   ```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🛠️ Technology Stack

- **Frontend**
  - Next.js
  - React
  - Tailwind CSS
  - DaisyUI

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- **DevOps**
  - Docker
  - Docker Compose
  - GitHub Actions

## 📁 Project Structure
```
CDC-Portal/
├── components/          # Reusable React components
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Layout components
│   ├── Profile/        # Profile management
│   ├── SEO/            # SEO optimization
│   └── UI/             # UI components
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   ├── admin/          # Admin dashboard
│   └── selections/     # Selection management
├── public/             # Static assets
├── styles/             # Global styles
└── utils/              # Utility functions
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please:
- Open an issue in the GitHub repository
- Contact at sakethkanuri10@gmail.com

---

