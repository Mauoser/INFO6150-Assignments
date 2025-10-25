# Calculator with User Login

## Description:

This is a simple web application that lets users log in with a username and password, then redirects them to a calculator page that performs basic arithmetic operations.

## Features Implemented

### Login Page

- Users enter a username and password to access the calculator.
- Validates input (cannot be empty).
- Stores username using localStorage.
- Redirects to the calculator page upon successful login.

### Calculator Page:

- Displays a personalized welcome message using the stored username.
- Allows users to input two numbers and select an operator.
- Calculates and displays the result.
- Handles invalid input with friendly error messages.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- jQuery

## How to Run the Application

1. Download or clone the project folder to your computer.
2. git clone https://github.com/Mauoser/INFO6150-Assignments.git
3. Open the Assignment6 folder.
4. Run the app by opening login.html in your browser.
5. To log in, enter the following username and password:
   - zhang.l5@northeastern.edu
   - password123
6. You’ll be redirected to calculator.html, where you can try the calculator.
7. Make sure both login.html, calculator.html, and their JavaScript files are in the same folder so the redirect and localStorage work correctly.
