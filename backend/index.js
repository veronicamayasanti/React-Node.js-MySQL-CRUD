import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';




const app = express();
app.use( express.json())
app.use(cors());
app.use(express.urlencoded({extended: true}));

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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Menyimpan file dengan nama unik
    }
});

const upload = multer({storage: storage}); 

// app.use('/public/img', express.static(path.join(__dirname, 'upload' )))


app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books"
    db.query(sql, (err, data) => {
        console.info(data);
        if(err) return res.json(err)
        return res.json(data);
    })
})


app.post("/books", upload.single('cover_image'), (req, res) => {
    const { title, author, publisher, publication_year, isbn } = req.body; 
    // const cover_image = req.file ? `/public/img/${req.file.filename}` : null;
    const cover_image = req.file ? req.file.filename : null;

    console.log('Received data:', { title, author, publisher, publication_year, isbn, cover_image });

    const sql = "INSERT INTO books (title, author, publisher, publication_year, isbn, cover_image) VALUES ?";
    const VALUES = [[title, author, publisher, publication_year, isbn, cover_image ]];

    db.query(sql, [VALUES], (err, data) => {
        if(err) {
            console.error('SQL error: ', err) 
        return res.status(500).json(err)
        } 
        return res.status(201).json(data);
    }) 
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const sql = "DELETE FROM books WHERE id = ?"

    db.query(sql, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted succeccfully")
    })
})

app.put("/books/:id", (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const publisher = req.body.publisher;
    const publication_year = req.body.publication_year;
    const isbn = req.body.isbn;
    const cover_image = req.body.cover_image;

    const bookId = req.params.id;
    const sql = "UPDATE books SET `title` = ?, `author` = ?, `publisher` = ?, `publication_year` = ?, `isbn` = ?, `cover_image` = ? WHERE id = ?";

    const VALUES = [
        title, 
        author, 
        publisher, 
        publication_year, 
        isbn, 
        cover_image
    ];

    db.query(sql, [...VALUES, bookId] ,(err, data) => {
        if (err) {
            console.error('error executing query: ', err)
         return res.json(err);
        }
        console.log('query successful, data ', data);   
        return res.json(data)
    })
})

app.listen(5000, () => {
    console.log(`Connected to backend http://localhost:5000`);
})