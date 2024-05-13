const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

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

app.get("/sait_project_api/mahasiswa_api/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM mahasiswa WHERE id_mhs = ?";

    db.query(query, id, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                status: 0,
                message: "Error retrieving mahasiswa.",
            });
        } else if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({
                status: 0,
                message: "Mahasiswa not found.",
            });
        }
    });
});

app.delete("/sait_project_api/mahasiswa_api/:id", (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM mahasiswa WHERE id_mhs = ?`;

    db.query(query, id, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                status: 0,
                message: "Mahasiswa Deletion Failed.",
            });
        } else {
            res.status(200).json({
                status: 1,
                message: "Mahasiswa Deleted Successfully.",
            });
        }
    });
});

app.post("/sait_project_api/mahasiswa_api", (req, res) => {
    const { nama, alamat } = req.body;
    const query = `INSERT INTO mahasiswa (nama, alamat) VALUES (?, ?)`;

    db.query(query, [nama, alamat], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                status: 0,
                message: "Adding Mahasiswa Failed.",
            });
        } else {
            res.status(200).json({
                status: 1,
                message: "Mahasiswa Added Successfully.",
            });
        }
    });
});

app.put("/sait_project_api/mahasiswa_api/:id", (req, res) => {
    const id = req.params.id;
    const { nama, alamat } = req.body;

    let query = `UPDATE mahasiswa SET `;
    let params = [];

    if (nama) {
        query += `nama = ?, `;
        params.push(nama);
    }

    if (alamat) {
        query += `alamat = ?, `;
        params.push(alamat);
    }

    query = query.slice(0, -2);

    query += ` WHERE id_mhs = ?`;
    params.push(id);

    db.query(query, params, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                status: 0,
                message: "Updating Mahasiswa Failed.",
            });
        } else {
            res.status(200).json({
                status: 1,
                message: "Mahasiswa Updated Successfully.",
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
