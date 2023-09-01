** IMPORTANT NOTICE **
Kindly pay attention to the Usage section of this README to understand the workability of the Project. Project is hosted on [Deployed Project](https://basecamp.mikerock.tech/) for easy access.

# Welcome to My Basecamp 2
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
  - Setup database tables: From the project root directory, run "cat setupDatabase.sql | mysql"

- Start Backend Server
  - Start the backend server by running "BASECAMP_USER=basecamp_dev BASECAMP_PWD=basecamp_dev_pwd BASECAMP_HOST=localhost BASECAMP_DB=basecamp_db python3 -m api.v1.app"

- Start Frontend Server
  - Navigate to the Frontend directory and run "npm start"

- Visit http://127.0.0.1:3000 on your browser

### Dependencies
- apt install nodejs
- apt install python
- apt install mysql-server
- pip install sqlalchemy
- pip install mysqlclient
- pip install bcrypt 
to mention a few 


## Usage
How does it work?
The Basecamp is built with a Model View Controller (MVC) design pattern, we implemented Object–relational 
mapping (ORM) technique for the database. 
You have the right to create a user and also display the user created, you can also delete a profile. 
#### In order to create a User 
- Click on the link of the project [Deployed Project](https://basecamp.mikerock.tech/)
- Then click on sign up, after which you will sign in with the details of registration at sign up 
#### You can also delete a user by doing the following
- Login with your details, 
- Then go to edit profile and you can either update or delete profile from there
#### To create a new project
- Click the Add Project option and fill in the project details. Note that you have to be logged in.
#### You can also make a user an admin of a particular project
- This can be done by first creating the project, if not already done.
- Then you can click on edit icon from the projects lists to go to the project edit page. Add the user's email to the Add Member field. Use the Admin toggle button to set their admin status. A user's Admin status is false by default.
- You can also make a user change a members admin status by navigating to the project's discussion page and then to the members tab.
- Furthermore, you can create, update and delete a project as and when required.
#### To start a Discussion
- Click on the chat icon of the target project and on the project tab, you simply type in the topic of the conversation and click the start thread button. This will open up a new thread for every member of the project to contribute.
- You can edit the topic of a thread only if you created it or you are the author of the project.
- Every user can edit/delete any message sent by them.
- To access all topics/conversations going on a project, go to the Topics tab.
#### Adding an Attachment
- Every member of a project can add an attachment to a project by choosing a file on the Add Attachment field and clicking Upload. 
- Supported formats are ['.pdf', '.txt', '.png', '.jpg']
- To see all Attachments for a project, navigate to the Attachments tab
- You can dowload any attachment from the page
- Only the project creator or the creator of the Attachment can delete it

#### Removing a member
- Navigate to the members tab and click on the delete button next to the member you want to remove
- You can also change a member's admin status by toggling the admin switch.

### The Core Team
- Michael Adebayo OGTL Academy => <a href="https://github.com/MikeRock51">Github</a>,
<a href="https://twitter.com/Mike_Rock1">Twitter</a>,
<a href="https://www.linkedin.com/in/michael-adebayo-637507251/">LinkedIn</a>
<a href="mailto:mikerockmusic51@gmail.com">Email</a>
- [Deployed Project](https://basecamp.mikerock.tech/)

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px'></span>
