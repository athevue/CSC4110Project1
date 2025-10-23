// database services, accessbile by DbService methods.

const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); // read from .env file

let instance = null; 


// if you use .env to configure
console.log("HOST: " + process.env.HOST);
console.log("DB USER: " + process.env.DB_USER);
console.log("PASSWORD: " + process.env.PASSWORD);
console.log("DATABASE: " + process.env.DATABASE);
console.log("DB PORT: " + process.env.DB_PORT);

const connection = mysql.createConnection({
     host: process.env.HOST,
     user: process.env.DB_USER,        
     password: process.env.PASSWORD,
     database: process.env.DATABASE,
     port: process.env.DB_PORT
});


// if you configure directly in this file, there is a security issue, but it will work
/*
const connection = mysql.createConnection({
     host:"localhost",
     user:"root",        
     password:"",
     database:"web_app",
     port:3306
});
*/


connection.connect((err) => {
     if(err){
        console.log(err.message);
     }
     console.log('db ' + connection.state);    // to see if the DB is connected or not
});

// the following are database functions, 

class DbService{
    static getDbServiceInstance(){ // only one instance is sufficient
        return instance? instance: new DbService();
    }

   /*
     This code defines an asynchronous function getAllData using the async/await syntax. 
     The purpose of this function is to retrieve all data from a database table named 
     "names" using a SQL query.

     Let's break down the code step by step:
         - async getAllData() {: This line declares an asynchronous function named getAllData.

         - try {: The try block is used to wrap the code that might throw an exception 
            If any errors occur within the try block, they can be caught and handled in 
            the catch block.

         - const response = await new Promise((resolve, reject) => { ... });: 
            This line uses the await keyword to pause the execution of the function 
            until the Promise is resolved. Inside the await, there is a new Promise 
            being created that represents the asynchronous operation of querying the 
            database. resolve is called when the database query is successful, 
            and it passes the query results. reject is called if there is an error 
            during the query, and it passes an Error object with an error message.

         - The connection.query method is used to execute the SQL query on the database.

         - return response;: If the database query is successful, the function returns 
           the response, which contains the results of the query.

        - catch (error) {: The catch block is executed if an error occurs anywhere in 
           the try block. It logs the error to the console.

        - console.log(error);: This line logs the error to the console.   
    }: Closes the catch block.

    In summary, this function performs an asynchronous database query using await and a 
   Promise to fetch all data from the "names" table. If the query is successful, 
   it returns the results; otherwise, it catches and logs any errors that occur 
   during the process. It's important to note that the await keyword is used here 
   to work with the asynchronous nature of the connection.query method, allowing 
   the function to pause until the query is completed.
   */
    async getAllData(){
        try{
           // use await to call an asynchronous function
           const response = await new Promise((resolve, reject) => 
              {
                  const query = "SELECT * FROM names;";
                  connection.query(query, 
                       (err, results) => {
                             if(err) reject(new Error(err.message));
                             else resolve(results);
                       }
                  );
               }
            );
        
            // console.log("dbServices.js: search result:");
            // console.log(response);  // for debugging to see the result of select
            return response;

        }  catch(error){
           console.log(error);
        }
   }

   // Getting user by the correct username
    async getUserByUsername(username) {
        try {
            const user = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE username = ?";
                connection.query(query, [username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results[0]);
                });
            });
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    // Update sign-in time
    async updateSignIn(userId) {
        try {
            const now = new Date();    
            const result = await new Promise((resolve, reject) => {
                const query = `
                    UPDATE names 
                    SET signInTime = ?, signInCount = IFNULL(signInCount, 0) + 1
                    WHERE id = ?
                `;
                connection.query(query, [now, userId], (err, res) => {
                    if (err) reject(new Error(err.message));
                    else resolve(res.affectedRows);
                });
            });
    
            return result === 1;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    
    // Search by name OR user ID
async searchByNameOrId(query) {
    try {
        const response = await new Promise((resolve, reject) => {
            const id = parseInt(query, 10);
            const isId = !isNaN(id);
            let sql = isId 
                ? "SELECT * FROM names WHERE id = ?" 
                : "SELECT * FROM names WHERE name LIKE ? OR lastName LIKE ?";
            const params = isId ? [id] : [`%${query}%`, `%${query}%`];
            connection.query(sql, params, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
        return response;
    } catch (err) {
        console.log(err);
    }
}

// Salary range
async searchBySalaryRange(min, max) {
    try {
        const response = await new Promise((resolve, reject) => {
            const sql = "SELECT * FROM names WHERE salary BETWEEN ? AND ?";
            connection.query(sql, [min, max], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
        return response;
    } catch (err) { console.log(err); }
}

// Age range
async searchByAgeRange(min, max) {
    try {
        const response = await new Promise((resolve, reject) => {
            const sql = "SELECT * FROM names WHERE age BETWEEN ? AND ?";
            connection.query(sql, [min, max], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
        return response;
    } catch (err) { console.log(err); }
}

// Registered after a user
async searchRegisteredAfter(userId) {
    try {
        const response = await new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM names 
                WHERE date_added > (SELECT date_added FROM names WHERE id = ?)`;
            connection.query(sql, [userId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
        return response;
    } catch (err) { console.log(err); }
}

// Registered same day as a user
async searchRegisteredSameDay(userId) {
    try {
        const response = await new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM names 
                WHERE DATE(date_added) = (SELECT DATE(date_added) FROM names WHERE id = ?)`;
            connection.query(sql, [userId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
        return response;
    } catch (err) { console.log(err); }
}

// Never signed in
async searchNeverSignedIn() {
    try {
        const response = await new Promise((resolve, reject) => {
            const sql = "SELECT * FROM names WHERE signInCount IS NULL OR signInCount = 0";
            connection.query(sql, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
        return response;
    } catch (err) { console.log(err); }
}

// Registered today
async searchRegisteredToday() {
    try {
        const response = await new Promise((resolve, reject) => {
            const sql = "SELECT * FROM names WHERE DATE(date_added) = CURDATE()";
            connection.query(sql, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
        return response;
    } catch (err) { console.log(err); }
}

async searchUsers({ query, minSalary, maxSalary, minAge, maxAge, refUserId, filterType }) {
    try {
        let sql = "SELECT * FROM names WHERE 1=1";
        const params = [];

        if(query) sql += " AND (name LIKE ? OR id = ?)", params.push(`%${query}%`, query);
        if(minSalary) sql += " AND salary >= ?", params.push(minSalary);
        if(maxSalary) sql += " AND salary <= ?", params.push(maxSalary);
        if(minAge) sql += " AND age >= ?", params.push(minAge);
        if(maxAge) sql += " AND age <= ?", params.push(maxAge);

        if(refUserId) {
            if(filterType === "after") sql += " AND date_added > (SELECT date_added FROM names WHERE id = ?)", params.push(refUserId);
            if(filterType === "sameDay") sql += " AND DATE(date_added) = (SELECT DATE(date_added) FROM names WHERE id = ?)", params.push(refUserId);
        }

        if(filterType === "neverSignedIn") sql += " AND signInCount IS NULL";
        if(filterType === "registeredToday") sql += " AND DATE(date_added) = CURDATE()";

        return await new Promise((resolve, reject) => {
            connection.query(sql, params, (err, results) => {
                if(err) reject(err);
                else resolve(results);
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

    


   async insertNewName(name){
         try{
            const date_added = new Date();
            // use await to call an asynchronous function
            const insertId = await new Promise((resolve, reject) => 
            {
               const query = "INSERT INTO names (name, date_added) VALUES (?, ?);";
               connection.query(query, [name, date_added], (err, result) => {
                   if(err) reject(new Error(err.message));
                   else resolve(result.insertId);
               });
            });
            console.log(insertId);  // for debugging to see the result of select
            return{
                 id: insertId,
                 name: name,
                 date_added: date_added
            }
         } catch(error){
               console.log(error);
         }
   }

   async insertNewUser(user) {
      try {
          const { username, password, name, lastName, salary, age} = user;
          const date_added = new Date();
  
          const insertId = await new Promise((resolve, reject) => {
              const query = `
                  INSERT INTO names 
                  (username, password, name, lastName, salary, age, date_added)
                  VALUES (?, ?, ?, ?, ?, ?, ?);
              `;
  
              connection.query(
                  query,
                  [username, password, name, lastName, salary, age, date_added],
                  (err, result) => {
                      if (err) reject(new Error(err.message));
                      else resolve(result.insertId);
                  }
              );
          });
  
          console.log("New user inserted:", username);
          return {
              id: insertId,
              username,
              name,
              lastName,
              salary,
              age,
              date_added
          };
      } catch (error) {
          console.log(error);
          throw error;
      }
  }
  
  
   

   async searchByName(name){
        try{
             const date_added = new Date();
             // use await to call an asynchronous function
             const response = await new Promise((resolve, reject) => 
                  {
                     const query = "SELECT * FROM names where name = ?;";
                     connection.query(query, [name], (err, results) => {
                         if(err) reject(new Error(err.message));
                         else resolve(results);
                     });
                  }
             );

             // console.log(response);  // for debugging to see the result of select
             return response;

         }  catch(error){
            console.log(error);
         }
   }

   async deleteRowById(id){
         try{
              id = parseInt(id, 10);
              // use await to call an asynchronous function
              const response = await new Promise((resolve, reject) => 
                  {
                     const query = "DELETE FROM names WHERE id = ?;";
                     connection.query(query, [id], (err, result) => {
                          if(err) reject(new Error(err.message));
                          else resolve(result.affectedRows);
                     });
                  }
               );

               console.log(response);  // for debugging to see the result of select
               return response === 1? true: false;

         }  catch(error){
              console.log(error);
         }
   }

  
  async updateNameById(id, newName){
      try{
           console.log("dbService: ");
           console.log(id);
           console.log(newName);
           id = parseInt(id, 10);
           // use await to call an asynchronous function
           const response = await new Promise((resolve, reject) => 
               {
                  const query = "UPDATE names SET name = ? WHERE id = ?;";
                  connection.query(query, [newName, id], (err, result) => {
                       if(err) reject(new Error(err.message));
                       else resolve(result.affectedRows);
                  });
               }
            );

            // console.log(response);  // for debugging to see the result of select
            return response === 1? true: false;
      }  catch(error){
         console.log(error);
      }
  }
}

module.exports = DbService;
