# React PHP Login Demo

This project is a simple demonstration of a login system using React for the front-end and PHP for the back-end. Below is an overview of the project structure and setup instructions.

## Project Structure

```
react-php-login-demo/
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.js        # Main React component
│   │   └── index.js      # Entry point for React
│   ├── public/          # Public assets
│   └── package.json     # NPM packages
└── backend/
    ├── api/
    │   ├── login.php     # PHP script for handling login
    │   └── logout.php    # PHP script for handling logout
    ├── config.php        # Database configuration
    └── .htaccess         # Apache configuration
```

## Setup Instructions

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Run `npm install` to install the necessary dependencies.
3. Start the development server with `npm start`.

### Backend Setup
1. Navigate to the `backend` directory.
2. Ensure you have a PHP server running (e.g., XAMPP, MAMP).
3. Update the `config.php` file with your database credentials.
4. Access the API endpoints via your server.

## Conclusion
This demo project serves as a basic foundation for understanding how to integrate React with a PHP back-end for user authentication.