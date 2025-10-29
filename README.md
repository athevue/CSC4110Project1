# **User Management Web Application**

## **Project Description**

In this project, we created a **Users table** and implemented functionality to register new users and allow them to sign into a website. The project took approximately **4 weeks** to complete and demonstrates secure coding practices, including protection against SQL injection.  

**Watch the project demonstration:** [Video Recording](https://waynestateprod-my.sharepoint.com/:v:/g/personal/hk5335_wayne_edu/ET_3ZH0YjXNGgHgVpfYq3_UBcQ8yZhdMifPVtwIH6HNbjw?e=8qOBaq&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D)

---

## **Required Functionality**

The project implements the following features:  

1. **User Registration**  
2. **User Sign-In** (protected against [SQL injection attacks](https://portswigger.net/support/using-sql-injection-to-bypass-authentication))  
3. **Search Users**  
   - By first and/or last name  
   - By user ID  
   - Users whose salary is between X and Y  
   - Users whose age is between X and Y  
   - Users who registered after a specific user (e.g., `john`)  
   - Users who never signed in  
   - Users who registered on the same day as a specific user  
   - Users who registered today  

> **Note:** Show and explain the results in a video. Submit all SQL statements in a file named `sql.txt`.  

---

## **Database Setup**

Create the `Users` table (feel free to modify the schema as needed):  

```sql
CREATE TABLE names(
   id INTEGER PRIMARY KEY,
   username VARCHAR(100),
   password VARCHAR(100), -- consider encrypting or hashing passwords
   name VARCHAR(100),
   lastName VARCHAR(50),
   salary DECIMAL(10,0),
   age INTEGER,
   date_added DATE,
   signInTime DATETIME, 
   signInCount INTEGER
);

```
## **How to Run the Sample Code**

### 1. Set up Apache web server
- Create a simple webpage `index.html` under:


- Open in your browser: [http://localhost/index.html](http://localhost/index.html)  
> This confirms that Apache is running.

---

### 2. Clone the sample project
```bash
cd C:\xampp\htdocs
git clone https://github.com/shiyonglu/database_javascript.git
```
3. Configure environment variables

Edit dbServices.js and app.js to use the .env file.

Create the MySQL database web_app and user john with password 1234 in phpMyAdmin
.

Or use the root user by modifying .env:

PORT=5050
DB_USER=root
PASSWORD=
DATABASE=web_app
DB_PORT=3306
HOST=localhost


Rename dotenv to .env:

move dotenv .env

4. Create the sample table in web_app
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

5. Backend Setup

Navigate to the backend folder:

C:\xampp\htdocs\database_javascript\project1\Backend


Install dependencies:

npm install express mysql cors nodemon dotenv


Start the backend server:

npm start


Test backend endpoints (returns JSON):
http://localhost:5050/getAll

6. Frontend Setup

Interact with the frontend:
http://localhost/database_javascript/project1/Frontend/index.html

Test all functionality including user registration, sign-in, and search queries.
