const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const nodemailer = require('nodemailer');
const server = express()
server.use(bodyParser.json());
const cors = require('cors');
server.use(cors());
server.use(express.json());

// MySQL Configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_technolab'
  });

  // Connect to MySQL
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.message);
      return;
    }
    console.log('Connected to MySQL successfully!');
  });

  // Start the Express server using the Port..
server.listen(3000,function check(error) {
    if (error)
    {
        console.log("Error...!!!");
    }
    else
    {
        console.log("Started...!!! 3000");
    }
});


// Create Table Records (Define a route)_Contact Page.
server.post("/api/tab_techno/add", (req, res) => {
    // console.log("arnab"); //connection testing with Postman(Debugging log).
    let details = {
        name: req.body.name,
        email: req.body.email,
        recipient: req.body.recipient,
        subject: req.body.subject,
        message: req.body.message,
    };
    let sql = "INSERT INTO tab_techno SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: "failed to create details"});
        } else {
            res.send({ status: true, message: "Create successfully"});
        }
    });
});

// View Table Records_Contact Page
server.get("/api/tab_techno", (req, res) => {
    var sql = "SELECT * FROM tab_techno";
    db.query(sql, function (error, result) {
        if (error) {
            console.log("failed to view details[exception: error connecting to db].contact to administrator");
        } else {
            res.send({ status: true, data: result});
        }
    });
});

// Search Table Records_Contact Page
server.get("/api/tab_techno/:id", (req, res) => {
    var id = req.params.id;
    var sql = "SELECT * FROM tab_techno WHERE id=" + id;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("failed to view details[exception: error connecting to db].contact to administrator");
        } else {
            res.send({ status: true, data: result});
        }
    });
});

// Update Table Records_Contact Page***
server.put("/api/tab_techno/update/:id", (req, res) => {
    let sql = "UPDATE tab_techno SET name='" + 
    req.body.name + 
    "', email='" +
    req.body.email + 
    "', recipient='" +
    req.body.recipient + 
    "', subject='" +
    req.body.subject +
    "', message='" +
    req.body.message +
    "' WHERE id=" +
    req.params.id;
    
    let a = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "failed to updated details"});
        } else {
            res.send({ status: true, message: "update successfully"});
        }
    });
});

// Delete Table Records_Contact Page***
server.delete("/api/tab_techno/delete/:id", (req, res) => {
    let sql = "DELETE FROM tab_techno WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "failed to delete details"});
        } else {
            res.send({ status: true, message: "Delete successfully"});
        }
    });
});



// Create Table Records (Define a route)_Admin-Login Page****.
server.post("/api/tab_adminlogin/add", (req, res) => {
    // console.log("arnab"); //connection testing with Postman(Debugging log).
    let details = {
        username: req.body.username,
        password: req.body.password,
    };
    let sql = "INSERT INTO tab_adminlogin SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: "failed to create details"});
        } else {
            res.send({ status: true, message: "Create successfully"});
        }
    });
});

// Search Table Records_Admin-Login Page[e.g: http://localhost:3000/api/tab_adminlogin/1]
// server.get("/api/tab_adminlogin/:id", (req, res) => {
//     var id = req.params.id;
//     var sql = "SELECT * FROM tab_adminlogin WHERE id=" + id;
//     db.query(sql, function (error, result) {
//         if (error) {
//             console.log("failed to view details[exception: error connecting to db].contact to administrator");
//         } else {
//             res.send({ status: true, data: result});
//         }
//     });
// });
server.post('/api/tab_adminlogin', (req, res) => {
    const { username, password } = req.body;
  
    // Query to find matching admin LogIn credentials in the database
    const query = 'SELECT * FROM tab_adminlogin WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send({ status: false, message: 'Database query failed' });
      } else if (results.length > 0) {
        // If admin exists, return success
        res.status(200).send({ status: true, message: 'Login successful', data: results[0] });
      } else {
        // If no matching admin is found, return an error
        res.status(401).send({ status: false, message: 'Invalid username or password' });
      }
    });
  });
  
  
// Configure Nodemailer for Email Connection******
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail (or change to another SMTP provider)
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // set true if port 465
    auth: {
      user: 'arnabadhikary.swt@gmail.com',
      pass: 'ntoh heyr qtjp odhw'
    }
  });
  
  // API to send an email
  server.post('/api/send-email', (req, res) => {

    const { name, email, subject, message } = req.body;

  // Hardcoded recipient email
  const recipient = 'arnabadhikary.swt@gmail.com';
  
// Send Email
    const mailOptions = {
      from: email, // Email captured from Angular form
      to: recipient, // Email entered in form or retrieved from DB
      subject: subject,
      text: `You have received a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error.message);
        return res.status(500).json({ status: false, message: "Email failed", error: error.message });
      }
      res.status(200).json({ status: true, message: "Email sent successfully", response: info.response });
    });
    
  });

  // Start Express server
    server.listen(3000, () => {
    console.log('Server running on port 3000');
  });