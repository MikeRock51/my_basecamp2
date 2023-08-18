** IMPORTANT NOTICE **
Kindly pay attention to the Usage section of this README to understand the workability of the Project. Project is hosted on [Deployed Project](http://mikerock.tech/) for easy access.

# Welcome to My Basecamp 1
A project management tool for developers.
Welcome to Basecamp! Discover a new level of collaboration and organization Basecamp.
Basecamp is a popular web-based project management and team collaboration software. 
It is designed to help teams and organizations manage projects, communicate effectively, and stay organized.
Basecamp provides a centralized platform where team members can collaborate, share information, track tasks,
and work together on various projects.

## Task
The Problem and Challenge.
Our task is to design and build a comprehensive User-Centric Project Management Platform like Basecamp that
encompasses three distinct components: a database, a backend system, and a frontend interface. 
The platform's primary objective is to provide users with a seamless and efficient means of creating, 
connecting, and managing projects while emphasizing an exceptional user experience.

## Description
How have you solved the problem?
We used a Model View Controller System to create the application, there are different components that we created.
Below are the components- 
Database Development:
  - We creates a well-structured database schema to store user profiles, project details, task lists, and other relevant data.
  - Implemented mechanisms for data security, encryption, and access control to safeguard sensitive information.
  - Ensure efficient data retrieval and storage to optimize platform performance.
Backend System:
  - We developed a robust backend system that handles user authentication, authorization, and secure account management.
  - We designed and implemented APIs for user registration, login, project creation, and collaboration.
  - We integrated real-time notification features to keep users informed about project updates, messages, and deadlines.
Frontend Interface:
  - We created an intuitive and visually appealing frontend interface for users to interact with the platform.
  - We designed user-friendly screens for account creation, login, project initiation, task management, and progress tracking.
  - We implemented responsive layouts and dynamic elements to ensure a seamless experience across devices.
User Experience Optimization:
  - We prioritized user-centered design principles to create an intuitive and delightful experience for users.
  - We ensured consistent branding, typography, and visual elements throughout the platform.
  - We implemented features that enhance usability, such as drag-and-drop task management,  and color-coded progress indicators.
Testing and Deployment:
  - Conduct thorough testing of the platform's functionalities, including user registration, project creation, collaboration, and notifications.
  - Debug and address any issues or inconsistencies to ensure a smooth user experience.
  - Deploy the platform to a suitable hosting environment, ensuring scalability and reliability.

## Installation
How to install your project? npm install? make? make re?
- Install project dependencies
  - Install the backend dependencies: "pip install -r requirements.txt"
  - Install the frontend dependencies: Navigate to the frontend directory and run "npm install"

- Setup database
  - Install mysql-server: "apt install mysql-server"
  - Setup database tables: From the project root directory, run "cat setupDatabase.sql | mysql

- Start Backend Server
  - Start the backend server by running "BASECAMP_USER=basecamp_dev BASECAMP_PWD=basecamp_dev_pwd BASECAMP_HOST=localhost BASECAMP_DB=basecamp_db python3 -m api.v1.app"

- Start Frontend Server
  - Navigate to the Frontend directory and run "npm run"

- Visit http://127.0.0.1:3000 on your browser

c. py -3 -m venv .venv - The command py -3 -m venv .venv is used to create the virtual environment for our Python 
                        project. Breaking down the command:
   py: This is the command used to invoke the Python interpreter. It's a shorthand for running Python scripts
       or managing Python environments.
   -3: This specifies that you want to use Python 3. When you have multiple versions of Python installed on
       your system, using -3 ensures that Python 3.x is used.
   -m venv: This part of the command instructs Python to use the built-in module venv to create a virtual 
       environment. A virtual environment is an isolated environment that allows you to manage dependencies and 
       packages separately from your system-wide Python installation.
   .venv: This is the name of the directory where the virtual environment will be created. In this case, it's 
       named .venv, but you can choose any name you prefer.
d. .venv\Scripts\activate - used to activate the virtual environment on our operating system
e. pip install Flask - used to download and install the Flask package from the Python Package Index (PyPI).
f. npm install -g create-react-app. - used to install the "create-react-app" tool globally on your system. 
    "create-react-app" is a command-line utility that helps you quickly set up and create new React.js 
    applications with all the necessary configurations and dependencies.
g. npm start. - is used to start our development server for the frontend part of our project built using React
others are 
- pip install sqlalchemy
- pip install mysqlclient
- pip install bcrypt 
to mention a few 


## Usage
How does it work?
The Basecamp is built with a Model View Controller (MVC) design pattern, we implemented Object–relational 
mapping (ORM) technique for the database. 
You have the right to create a user and also display the user created, you can also delete a profile. 
In order to create a User 
- click on the link of the project (http://mikerock.tech/)
- then click on sign up, after which you will sign in with the details of registration at sign up 
You can also delete a user by doing the following
- login with your details, 
- then go to edit profile and you can either update or delete profile from there
You can also make a user an admin from a particular project
- this can be done by first creating a project, and adding users to the project. 
- then you can click on edit icon from the projects lists, after which you will see the button to 
make the user to become an admin, or remove from admin.
Furthermore, you can create, update and delete a project as and when required. 

### The Core Team
This project was a collaboration- based project. The contributors are 
- Michael Adebayo OGTL Academy 
- Olasunkanmi Adebiyi OGTL Academy 

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px'></span>
