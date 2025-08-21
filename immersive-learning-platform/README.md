# Immersive Learning Platform - Vanilla JS MVP

This is a demonstration of an immersive learning platform built with vanilla HTML, CSS, and JavaScript. It uses Three.js for the 3D scene and stores all data in the browser's Local Storage.

## How to Run

This project is designed to be run without a build step.

1.  Unzip the `immersive-learning-platform.zip` file.
2.  Navigate to the unzipped directory.
3.  **Open the `index.html` file in a modern web browser (Chrome, Firefox, Edge).**

**Important Note:** Due to browser security restrictions (CORS policy) on loading ES Modules from the `file://` protocol, you may see an error in the browser console. For the best experience and for the 3D scene to load correctly, it is **highly recommended** to serve the files using a simple local web server.

You can do this easily with Python:
```sh
# If you have Python 3 installed, run this command in the project directory
python -m http.server
```
Or with Node.js (if you have it installed):
```sh
# First, install the 'serve' package globally
npm install -g serve
# Then, run the server in the project directory
serve .
```
Then, navigate to `http://localhost:8000` (or the port specified by the server) in your browser.

## How to Test Basic Functionality

1.  **Login:** The application starts on the authentication page (`#/auth`). Enter a name and click "Login" or click "Continue as Guest".
2.  **Navigation:** After logging in, you will be on the "Home" page. Use the header links to navigate between "Home", "3D Space", "Reports", and "Settings".
3.  **3D Scene:** Navigate to the "3D Space" page. You should see a 3D scene with an orange cube on a gray floor. You can use your mouse to orbit the camera (click and drag) and zoom (scroll wheel).
4.  **Language Switching:** Use the "EN" and "AR" buttons in the header to switch the language. This demo only translates the header links, but it demonstrates the functionality.

## Project Structure

-   `index.html`: The main entry point for the application.
-   `css/styles.css`: Contains all the styling for the application.
-   `js/`: Contains the JavaScript source code.
    -   `app.js`: The main application logic, including the router and state management.
    -   `pages/`: Contains a module for each page of the application.
    -   `layout/`: Contains layout components like the header.
    -   `scene.js`: Contains all the Three.js logic for the 3D scene.
-   `README.md`: This file.
-   `test-checklist.txt`: A list of acceptance criteria for testing.
