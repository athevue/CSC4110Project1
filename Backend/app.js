// Backend: application services, accessible by URIs


const express = require('express')
const cors = require ('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express();

const dbService = require('./dbService');


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

// create
app.post('/insert', (request, response) => {
    console.log("app: insert a row.");
    // console.log(request.body); 

    const {name} = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(name);
 
    // note that result is a promise
    result 
    .then(data => response.json({data: data})) // return the newly added row to frontend, which will show it
   // .then(data => console.log({data: data})) // debug first before return by response
   .catch(err => console.log(err));
});


// testing register post
app.post('/register', (request, response) => {
    console.log("Registering new user");

    const { name, lastName, username, password, salary, age, dateAdded} = request.body;
    const db = dbService.getDbServiceInstance();

    const newUser = {
        username,
        password,
        name,  
        lastName,
        salary,
        age,
        dateAdded
    };

    const result = db.insertNewUser(newUser);

    result
        .then(data => response.json({ data }))
        .catch(err => {
            console.log(err);
            response.status(500).json({ error: err.message });
        });
});


// read 
app.get('/getAll', (request, response) => {
    
    const db = dbService.getDbServiceInstance();

    
    const result =  db.getAllData(); // call a DB function

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
});


// app.get('/search/:name', (request, response) => { // we can debug by URL
    
//     const {name} = request.params;
    
//     console.log(name);

//     const db = dbService.getDbServiceInstance();

//     let result;
//     if(name === "all") // in case we want to search all
//        result = db.getAllData()
//     else 
//        result =  db.searchByName(name); // call a DB function

//     result
//     .then(data => response.json({data: data}))
//     .catch(err => console.log(err));
// });

// search with query parameters
app.get('/search', (req, res) => {
    const db = dbService.getDbServiceInstance();
  
    const { type, name, id, min, max } = req.query;
    let result;
  
    switch (type) {
      case "name":
        result = db.searchByName(name);
        break;
      case "id":
        result = db.searchByUserId(id);
        break;
      case "salary":
        result = db.searchBySalaryRange(min, max);
        break;
      case "age":
        result = db.searchByAgeRange(min, max);
        break;
      case "afterUser":
        result = db.searchAfterUser(id);
        break;
      case "neverSignedIn":
        result = db.searchNeverSignedIn();
        break;
      case "sameDay":
        result = db.searchSameDayAsUser(id);
        break;
      default:
        result = db.getAllData();
    }
  
    result
      .then(data => res.json({ data }))
      .catch(err => console.log(err));
  });
  

// update
app.patch('/update', 
     (request, response) => {
          console.log("app: update is called");
          //console.log(request.body);
          const{id, name} = request.body;
          console.log(id);
          console.log(name);
          const db = dbService.getDbServiceInstance();

          const result = db.updateNameById(id, name);

          result.then(data => response.json({success: true}))
          .catch(err => console.log(err)); 

     }
);

// delete service
app.delete('/delete/:id', 
     (request, response) => {     
        const {id} = request.params;
        console.log("delete");
        console.log(id);
        const db = dbService.getDbServiceInstance();

        const result = db.deleteRowById(id);

        result.then(data => response.json({success: true}))
        .catch(err => console.log(err));
     }
)   

// debug function, will be deleted later
app.post('/debug', (request, response) => {
    // console.log(request.body); 

    const {debug} = request.body;
    console.log(debug);

    return response.json({success: true});
});   

// debug function: use http://localhost:5050/testdb to try a DB function
// should be deleted finally
app.get('/testdb', (request, response) => {
    
    const db = dbService.getDbServiceInstance();

    
    const result =  db.deleteById("14"); // call a DB function here, change it to the one you want

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
});

// Login service
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Basic input validation
    if (!username || !password) {
        return res.status(400).json({ message: "Missing username or password" });
    }

    try {
        console.log("Login attempt:", username);

        // Use the singleton instance of DbService
        const DbService = require('./dbService');
        const dbService = DbService.getDbServiceInstance();

        // Get the user by username
        const user = await dbService.getUserByUsername(username);
        console.log("User fetched:", user);

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Plaintext password comparison for now
        const validPassword = (password === user.password);
        console.log("Password check result:", validPassword);

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid username or password" });
        }


        console.log("User fetched:", user);

        // Update last sign-in timestamp
        await dbService.updateSignIn(user.id);
        console.log("Sign-in timestamp updated for:", user.id);

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
});


// set up the web server listener
// if we use .env to configure
/*
app.listen(process.env.PORT, 
    () => {
        console.log("I am listening on the configured port " + process.env.PORT)
    }
);
*/

// if we configure here directly
app.listen(5050, 
    () => {
        console.log("I am listening on the fixed port 5050.")
    }
);
