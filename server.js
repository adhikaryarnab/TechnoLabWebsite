const express = require('express')  // ✅npm i express
const bodyParser = require('body-parser') // ✅npm i body-parser
const mysql = require("mysql");    // ✅npm i mysql
const nodemailer = require('nodemailer'); // ✅npm install nodemailer
const server = express()
server.use(bodyParser.json());
const cors = require('cors');  // ✅ npm install cors
server.use(cors());
server.use(express.json());
// require('dotenv').config(); // ✅npm install dotenv

// ✅npm i nodemon [Installed nodemon for Auto Compiler]***
// ✅use> "nodemon server.js" instead of "node server.js" *******

// ✅ MySQL Configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_technolab'
  });

  // ✅ Connect to MySQL
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.message);
      return;
    }
    console.log('Connected to MySQL successfully!');
  });

  // ✅ Start the Express server using the Port..
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


// ✅ Create Table Records (Define a route)_Contact Page.
server.post("/api/tab_techno/add", (req, res) => {
    // ✅ console.log("arnab"); // ✅connection testing with Postman(Debugging log).
    let details = {
        name: req.body.name,
        email: req.body.email,
        recipient: req.body.recipient,
        subject: req.body.subject,
        message: req.body.message,
        message: req.body.DateOfContact,
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

// ✅ View Table Records_Contact Page
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

// ✅ Search Table Records_Contact Page
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

// ✅ Update Table Records_Contact Page***
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

// ✅ Delete Table Records_Contact Page***
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



// ✅ Create Table Records (Define a route)_Admin-Login Page****.
server.post("/api/tab_adminlogin/add", (req, res) => {
    // ✅ console.log("arnab"); // ✅connection testing with Postman(Debugging log).
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


server.post('/api/tab_adminlogin', (req, res) => {
    const { username, password } = req.body;
  
    // ✅ Query to find matching admin LogIn credentials in the database
    const query = 'SELECT * FROM tab_adminlogin WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send({ status: false, message: 'Database query failed' });
      } else if (results.length > 0) {
        // ✅ If admin exists, return success
        res.status(200).send({ status: true, message: 'Login successful', data: results[0] });
      } else {
        // ✅ If no matching admin is found, return an error
        res.status(401).send({ status: false, message: 'Invalid username or password' });
      }
    });
  });
  
  
// ✅ Login mandatory Authentication**
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
function adminHandler(req, res) {
  res.send({ status: true, message: 'Admin panel endpoint reached.' });
}

function viewRegistrationHandler(req, res) {
  res.send({ status: true, message: 'View registration endpoint reached.' });
}

function viewContactHandler(req, res) {
  res.send({ status: true, message: 'View contact endpoint reached.' });
}


// ✅ Apply to sensitive routes
server.get('/api/admin', requireLogin, adminHandler);
server.get('/api/view_registration', requireLogin, viewRegistrationHandler);
server.get('/view_contact', requireLogin, viewContactHandler);



// ✅ Configure Nodemailer for Email Connection******
require('dotenv').config();    // ✅npm install dotenv & npm install Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // ✅ Use Gmail (or change to another SMTP provider)
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // ✅ set true if port 465
    auth: {
      user: 'arnabadhikary.swt@gmail.com',
      pass: 'ntoh heyr qtjp odhw'
    }
  });
  
  // ✅ API to send an email
  server.post('/api/send-email', (req, res) => {

    const { name, email, subject, message } = req.body;

  // ✅ Hardcoded recipient email
  const recipient = 'arnabadhikary.swt@gmail.com';
  
// ✅ Send Email
    const mailOptions = {
      from: email, // ✅ Email captured from Angular form
      to: recipient, // ✅ Email entered in form or retrieved from DB
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` // ✅ Convert object to formatted string
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error.message);
        return res.status(500).json({ status: false, message: "Email failed", error: error.message });
      }
      res.status(200).json({ status: true, message: "Email sent successfully", response: info.response });
    });
    
  });

  // ✅ Start Express server
  // ✅   server.listen(3000, () => {
  // ✅   console.log('Server running on port 3000');
  // ✅ });


// ✅Application / Registration Form fillup**
// ✅ CREATE

server.post("/api/registration/add", (req, res) => {
    let details = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        parentFirstName: req.body.parentFirstName,
        parentMiddleName: req.body.parentMiddleName,
        parentLastName: req.body.parentLastName,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender,
        country: req.body.country,
        presentAddress: req.body.presentAddress,
        permanentAddress: req.body.permanentAddress,
        state: req.body.state,
        city: req.body.city,
        pin: req.body.pin,
        qualification: req.body.qualification,
        year: req.body.year,
        subject: req.body.subject,
        coursetype: req.body.coursetype,
        message: req.body.message,

    };

    let sql = "INSERT INTO registration SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: "Message Send Failed" });
        } else {
            res.send({ status: true, message: "Message Send Successfully"});
        }
    });
});

// ✅ READ All

server.get("/api/registration", (req, res) => {
    var sql = "SELECT * FROM registration";
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting DB");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

// ✅ READ BY ID

server.get("/api/registration/:id", (req, res) => {
    var contactid = req.params.id;
    var sql = "SELECT * FROM registration WHERE id=" + contactid;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting DB");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

// ✅ Update registration and log changes
server.put("/api/registration/update/:id", (req, res) => {
    const data = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        parentFirstName: req.body.parentFirstName,
        parentMiddleName: req.body.parentMiddleName,
        parentLastName: req.body.parentLastName,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender,
        country: req.body.country,
        presentAddress: req.body.presentAddress,
        permanentAddress: req.body.permanentAddress,
        state: req.body.state,
        city: req.body.city,
        pin: req.body.pin,
        qualification: req.body.qualification,
        year: req.body.year,
        subject: req.body.subject,
        coursetype: req.body.coursetype,
        message: req.body.message
    };

    // ✅ 1. Update the registration record
    let sql = `UPDATE registration SET ? WHERE id = ?`;
    db.query(sql, [data, req.params.id], (error, result) => {
        if (error) {
            res.send({ status: false, message: "Contact Update Failed" });
            return;
        }
        // ✅ 2. Insert new data in logs for record-keeping after success
        let logssql = "INSERT INTO register_logs SET ?";
        db.query(logssql, data, (logErr) => {
            if (logErr) {
                res.send({
                    status: false,
                    message:
                        "Contact Updated, but failed to log changes. Contact administration."
                });
            } else {
                res.send({
                    status: true,
                    message: "Contact Updated and change logged successfully"
                });
            }
        });
    });
});


// ✅ DELETE

// ✅ server.delete("/api/registration/delete/:id", (req, res) => {
// ✅     let sql = "DELETE FROM registration WHERE id=" + req.params.id + "";
// ✅     let query = db.query(sql, (error) => {
// ✅       if (error) {
// ✅         res.send({ status: false, message: "Contact Delete Failed" });
// ✅       } else {
// ✅         res.send({ status: true, message: "Contact Deleted successfully" });
// ✅       }
// ✅     });
// ✅   });


// ✅ Soft DELETE process that can retreave data from DB***
server.put('/api/registration/delete/:id', (req, res) => {
  let id = req.params.id;
  let sql = 'UPDATE registration SET IsDeleted = 1 WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ status: false, message: 'Soft delete failed' });
    }
    res.send({ status: true, message: 'Contact marked as deleted' });
  });
});


    // ✅ Start Express server
    server.listen(3000, () => {
    console.log('Server running on port 3000');
  });
