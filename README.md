# 🎁 Wishome - Gift List Management

**Wishome** is an application for creating and managing gift lists, with two types of users: **wisher** and **gifters**. The wisher can create a list of gifts they would like to receive, while gifters can mark products as "thinking" or "purchased". The wisher has control over who can view their address and can track who has purchased or is thinking about purchasing certain items.

## 🛠 Features

- **Wisher**:
  - A single user responsible for creating and managing the gift list.
  - Can see which gifters are thinking about or have purchased each item.
  - Validates gifters so they can view the delivery address.
- **Gifters**:
  - Can sign up for the platform and view the gift list.
  - Can mark products as "thinking" or "purchased".
  - Can copy the wisher's address (only after being validated by the wisher).

- **Products**:
  - All users can see the status of products: **available** or **purchased**.
  - The wisher can view which gifters are associated with products marked as "purchased".

## 🚀 Technologies Used

### Frontend:

- **React** with **React Router**: For page navigation.
- **Chakra UI**: Component library for the interface.

### Backend:

- **Flask**: Backend framework for RESTful APIs.
- **Python**: Core language for the backend.
- **Bcrypt**: For secure password hashing.
- **SQLite**: Database for storing user and product data.

## 📂 Project Structure

```
/frontend
│
├── /app
│   ├── /home         # Home page        
│   ├── /login        # Login page for gifters
│   ├── /register     # Registration page for gifters
│   ├── /list         # Gift list page
│   ├── /password     # Password reset page
│   ├── /wisher
│   │   ├── /add-products 
│   │   └── /dashboard  
│   │   ├── /validated-users
│   │   └── /wishlist  
│   └── /notFound     # 404 page
│
├── App.tsx               # Main React application file
└── index.tsx             # Entry point of the React application
```

## 🏗 Backend Features

- **Gifter Registration**: Gifters can sign up on the platform, and their information is securely stored.
- **Authentication**: User login and account creation are handled with JWT for session management.
- **Product Management**:
  - Gifters can mark products as "purchased".
  - The wisher can view all gifters associated with a product.
- **Email Notifications**: Send notifications when a new user registers (using SMTP).

## 📝 Installation and Setup

### Prerequisites

- **Node.js**: [Download](https://nodejs.org/)
- **npm** or **yarn**
- **Python 3.x**

### Steps to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/your-username/wishome.git
cd wishome
```

2. Set up the frontend:

```bash
cd frontend
npm install
npm run dev
```

3. Set up the backend:

```bash
cd ../backend
pip install -r requirements.txt
```

4. Start the backend server:

```bash
python server.py
```

### Environment Variables

1. Create a `.env` file in the `backend` directory with the following variables:

```
USER_EMAIL=your-email@example.com
PASSWORD_EMAIL=your-email-password
```

These are used for email notifications.

3. Create a `.env` file in the `frontend` directory with the following variables:

```
VITE_WHATSAPP_NUMBER = your-number
```

These are used for contact support.

## 🔐 Security

- **Encrypted Passwords**: User passwords are securely hashed with Bcrypt.
- **JWT Tokens**: Used to secure routes and manage user sessions.
- **Role-based Access**: Different user roles (wisher and gifters) with specific permissions.

## 👨‍💻 Contributions

1. Fork the project.
2. Create a branch for your new feature: `git checkout -b new-feature`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin new-feature`.
5. Create a Pull Request.