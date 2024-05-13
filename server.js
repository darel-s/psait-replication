const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // Import the cors package

const app = express();
const port = 3030;

// Use cors as a middleware
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "",
    database: "sait_db",
});

app.get("/sait_project_api/mahasiswa_api", (req, res) => {
    db.query("SELECT * FROM mahasiswa", (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
