**Project Description**

In this project, you will create a user table and then use it to register a new user and allow the user to sign into a website. This project will take 4 weeks.

Watch this video recording: https://waynestateprod-my.sharepoint.com/:v:/g/personal/hk5335_wayne_edu/ET_3ZH0YjXNGgHgVpfYq3_UBcQ8yZhdMifPVtwIH6HNbjw?e=8qOBaq&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D


**Required Functionality**

Please implement the following interface and functionality:

1. User registration
2. User sign-in, make sure your implementation is not subject to SQL injection attack
3. Search users by first and/or last name
4. Search users by user ID
5. Search all users whose salary is between X and Y
6. Search all users whose ages are between X and Y
7. Search users who registered after john registered (where john is the user ID)
8. Search users who never signed in
9. Search users who registered on the same day as john
10. Return the users who registered today

(Show and explain the results above in a video. Submit all SQL statements in a file called sql.txt.)


***Database Setup***
Consider creating the Users table using the following CREATE TABLE statement (feel free to revise it):

CREATE TABLE names(
   id INTEGER PRIMARY KEY,
   username VARCHAR(100),
   password VARCHAR(100), -- maybe encrypted or hashed
   name VARCHAR(100),
   lastName VARCHAR(50),
   salary DECIMAL(10,0),
   age INTEGER,
   date_added DATE,
   signInTime DATETIME, 
   signInCount INTEGER
);


How to Run the Sample Code

Set up Apache web server
Create the first webpage index.html under:
C:\xampp\htdocs\
Then open in your browser: http://localhost/index.html
This confirms that the web server is running.
Clone the sample project
cd C:\xampp\htdocs
git clone https://github.com/shiyonglu/database_javascript.git



Access the frontend via:
http://localhost/database_javascript/project1/Frontend/index.html

Configure parameters in dbServices.js and app.js using the .env file.
Create the MySQL database web_app and user john with password 1234 in phpMyAdmin
.
Or use root user by modifying .env:

*PORT=5050
DB_USER=root
PASSWORD=
DATABASE=web_app
DB_PORT=3306
HOST=localhost*


Rename dotenv to .env:
move dotenv .env


Create a sample table in the web_app database:

CREATE TABLE names(
   id INTEGER PRIMARY KEY,
   username VARCHAR(100),
   password VARCHAR(100), -- maybe encrypted or hashed
   name VARCHAR(100),
   lastName VARCHAR(50),
   salary DECIMAL(10,0),
   age INTEGER,
   date_added DATE,
   signInTime DATETIME, 
   signInCount INTEGER
);


Navigate to the backend folder:
C:\xampp\htdocs\database_javascript\project1\Backend
Install dependencies:

npm install express mysql cors nodemon dotenv


Start the backend server:
npm start


Test backend endpoints (returns JSON):
http://localhost:5050/getAll


Interact with the frontend:
http://localhost/database_javascript/project1/Frontend/index.html

