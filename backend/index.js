import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';



const app = express();
app.use( express.json())
app.use(cors());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "crud_app"
})

db.connect((err) => {
    if(err) {
        console.error('Error koneksi ke drabase:', err);
    } else {
        console.log('koneksi ke database berhasil!');
    }
});

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books"
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data);
    })
})


app.post("/books", (req, res) => {
    const title  = req.body.title;
    const author = req.body.author;
    const  publisher = req.body.publisher;
    const  publication_year = req.body.publication_year;
    const isbn = req.body.isbn;
    const cover_image =  req.body.cover_image;

    const sql = "INSERT INTO books (title, author, publisher, publication_year, isbn, cover_image) VALUES (?)";
    const VALUES = [title, author, publisher, publication_year, isbn, cover_image ];

    db.query(sql, [VALUES], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(3001, () => {
    console.log(`Connected to backend http://localhost:8800`);
})